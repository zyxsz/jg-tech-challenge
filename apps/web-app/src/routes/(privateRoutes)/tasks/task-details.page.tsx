import { TasksService } from "@/api/services/tasks.service";
import {
  TaskPriorityDescription,
  TaskPriorityIcon,
  TaskPriorityLabel,
} from "@/components/formatters/task-priority.formatter";
import {
  TaskStatusDescription,
  TaskStatusIcon,
  TaskStatusLabel,
} from "@/components/formatters/task-status.formatter";
import { Tag } from "@/components/tag";
import { TaskComments } from "@/components/task-comments";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { distanceToNow, formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { queryClient } from "@/providers";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { parseISO } from "date-fns";
import {
  ArrowLeftIcon,
  CalendarIcon,
  SquarePenIcon,
  Trash2Icon,
  UserPlusIcon,
} from "lucide-react";
import { useTransition } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

export const TaskDetails = () => {
  const navigate = useNavigate({ from: "/tasks/$taskId" });

  const { taskId } = useParams({ from: "/privateRoutes/tasks/$taskId" });
  const { data: task, isLoading } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => TasksService.getTask(taskId),
  });

  if (isLoading) return <p>Loading</p>;
  if (!task) return <p>Task not found</p>;

  const UpdateButton = () => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Tag asChild>
            <Link to="/tasks/$taskId/update" params={{ taskId: task.id }}>
              <SquarePenIcon />
            </Link>
          </Tag>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={4}>
          <p>Atualizar tarefa</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  const DeleteButton = () => {
    const [isDeleting, startDeleteTransition] = useTransition();

    const handleConfirm = () => {
      startDeleteTransition(async () => {
        await TasksService.delete(task.id);

        toast.success("Tarefa deletada com sucesso, redirecionando...");
        await queryClient.invalidateQueries({
          queryKey: ["tasks"],
          exact: false,
        });

        navigate({ to: "/tasks" });
      });
    };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Tag className={cn(isDeleting && "cursor-progress opacity-50")}>
                  <Trash2Icon />
                </Tag>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser revertida. Isso irá deletar todos os
                    dados relacionados a essa tarefa.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirm}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={4}>
          <p>Deletar tarefa</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  const TermTag = () => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Tag>
            <CalendarIcon />
            {distanceToNow(parseISO(task.term))}
          </Tag>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={4}>
          <p>
            O prazo da tarefa foi definido para{" "}
            <strong>{formatDate(parseISO(task.term))}</strong>
          </p>
        </TooltipContent>
      </Tooltip>
    );
  };

  const PriorityTag = () => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Tag className="ml-2">
            <TaskPriorityIcon priority={task.priority} />
            <TaskPriorityLabel priority={task.priority} />
          </Tag>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={4}>
          <p>
            <TaskPriorityDescription priority={task.priority} />
          </p>
        </TooltipContent>
      </Tooltip>
    );
  };

  const StatusTag = () => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Tag>
            <TaskStatusIcon status={task.status} />
            <TaskStatusLabel status={task.status} />
          </Tag>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={4}>
          <p>
            <TaskStatusDescription status={task.status} />
          </p>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <div className="space-y-4">
      <header>
        <Button
          variant="link"
          color="muted"
          className="font-normal px-0!"
          asChild
        >
          <Link to="/tasks">
            <ArrowLeftIcon />
            Voltar
          </Link>
        </Button>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-end gap-2">
            <h1 className="text-4xl font-black">{task.title}</h1>

            <PriorityTag />
            <StatusTag />
          </div>

          <div className="flex items-center justify-end gap-2">
            {task.relations?.author && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Tag>
                    <UserPlusIcon />
                  </Tag>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={4}>
                  <p>
                    Tarefa criada por{" "}
                    <strong>{task.relations.author.username}</strong>
                  </p>
                </TooltipContent>
              </Tooltip>
            )}

            <TermTag />
            <UpdateButton />
            <DeleteButton />
          </div>
        </div>
      </header>

      <div className="bg-card rounded-md border p-4 text-muted-foreground markdown">
        <Markdown remarkPlugins={[remarkGfm]}>{task.description}</Markdown>
      </div>

      <section>
        <Tabs defaultValue="comments">
          <TabsList>
            <TabsTrigger value="comments">Comentários</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="logs">Histórico de atualizações</TabsTrigger>
          </TabsList>
          <TabsContent value="comments">
            <TaskComments taskId={task.id} />
          </TabsContent>
          <TabsContent value="users">Change your password here.</TabsContent>
        </Tabs>
      </section>
    </div>
  );
};
