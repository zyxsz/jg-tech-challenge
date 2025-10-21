import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
  ArrowLeftIcon,
  CalendarIcon,
  SquarePenIcon,
  Trash2Icon,
  UserPlusIcon,
} from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import type { Task } from "@/api/interfaces/task.entity";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tag } from "../tag";
import { useTransition } from "react";
import { TasksService } from "@/api/services/tasks.service";
import { toast } from "sonner";
import { queryClient } from "@/providers";
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
} from "../ui/alert-dialog";
import { cn } from "@/lib/utils";
import { distanceToNow, formatDate } from "@/lib/date";
import { parseISO } from "date-fns";
import {
  TaskPriorityDescription,
  TaskPriorityIcon,
  TaskPriorityLabel,
} from "../formatters/task-priority.formatter";
import {
  TaskStatusDescription,
  TaskStatusIcon,
  TaskStatusLabel,
} from "../formatters/task-status.formatter";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  task: Task;
}

export const TaskDetails = ({ task }: Props) => {
  const navigate = useNavigate();

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
        await TasksService.delete(task.id)
          .then(async () => {
            toast.success("Tarefa deletada com sucesso, redirecionando...");
            await queryClient.invalidateQueries({
              queryKey: ["tasks"],
              exact: false,
            });

            navigate({ to: "/tasks" });
          })
          .catch((error) => {
            const message =
              error.response?.data?.message ||
              error?.message ||
              "Não foi possível deletar essa tarefa.";

            toast.error(message);
          });
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
          <Tag className="ml-2 max-sm:ml-0">
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
    <Fragment>
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
        <div className="flex items-center justify-between gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <div className="flex items-end gap-2 max-sm:flex-col max-sm:items-start">
            <h1 className="text-4xl font-black max-sm:text-3xl">
              {task.title}
            </h1>

            <div className="flex items-end gap-2">
              <PriorityTag />
              <StatusTag />
            </div>
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
    </Fragment>
  );
};
