import { TasksService } from "@/api/services/tasks.service";
import { UpdateTaskForm } from "@/components/forms/update-task.form";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { parseISO } from "date-fns";
import { ArrowLeftIcon } from "lucide-react";

export const UpdateTaskPage = () => {
  const { taskId } = useParams({ from: "/privateRoutes/tasks/$taskId/update" });
  const { data: task, isLoading } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => TasksService.getTask(taskId),
  });

  if (isLoading) return <p>Loading</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <div className="space-y-4 pb-12">
      <header>
        <Button
          variant="link"
          color="muted"
          className="font-normal px-0!"
          asChild
        >
          <Link to="/tasks/$taskId" params={{ taskId: task.id }}>
            <ArrowLeftIcon /> Voltar
          </Link>
        </Button>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Atualizar tarefa
        </h1>
        <p className="text-muted-foreground text-sm">
          Preencha todos os campos abaixo para criar uma nova tarefa.
        </p>
      </header>

      <UpdateTaskForm
        taskId={task.id}
        defaultValues={{
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          term: parseISO(task.term),
        }}
      />
    </div>
  );
};
