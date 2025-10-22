import type { Task } from "@/api/interfaces/task.entity";
import { TasksService } from "@/api/services/tasks.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { distanceToNow } from "@/lib/date";
import { useQuery } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { TaskMeAssignmentButton } from "./me-assignment-button";
import { AssignmentsSkeleton } from "./assignments-skeleton";
import { ErrorContainer } from "@/components/error-container";
import { TaskAssignmentButton } from "./assignment-button";

interface Props {
  task: Task;
}

export const TaskAssignmentsContainer = ({ task }: Props) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["tasks", task.id, "assignments"],
    queryFn: () => TasksService.getTaskAssignments(task.id),
  });

  const handleRefetch = async () => {
    await refetch();
  };

  if (isLoading) return <AssignmentsSkeleton />;

  if (error) return <ErrorContainer message={error.message} />;
  if (!data)
    return <ErrorContainer message={"Unable to fetch for assignments"} />;

  if (data.length <= 0)
    return (
      <div>
        <h2 className="text-xl font-bold">Nenhuma associação encontrada</h2>
        <p className="text-sm text-muted-foreground">
          Clique no botão abaixo para se associar a esta tarefa!
        </p>
        <div className="mt-2 flex items-center gap-2">
          <TaskMeAssignmentButton taskId={task.id} refetch={handleRefetch} />
          <TaskAssignmentButton taskId={task.id} refetch={handleRefetch} />
        </div>
      </div>
    );

  return (
    <div className="space-y-2">
      {data
        ?.filter((assignment) => !!assignment.relations?.user)
        .map((assignment) => (
          <div
            key={assignment.id}
            className="bg-card rounded-md border p-2 flex items-center justify-between gap-4"
          >
            {assignment?.relations?.user && (
              <header className="flex items-center gap-2">
                <figure>
                  <Avatar className="size-10">
                    <AvatarImage
                      src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(assignment.relations.user.username)}`}
                    />
                    <AvatarFallback>
                      {assignment.relations.user.username.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </figure>

                <h1>{assignment.relations.user.username}</h1>
              </header>
            )}
            <p className="text-xs text-muted-foreground">
              Associado {distanceToNow(parseISO(assignment.assignedAt))}
            </p>
          </div>
        ))}

      <div className="mt-2 flex items-center gap-2">
        <TaskMeAssignmentButton taskId={task.id} refetch={handleRefetch} />
        <TaskAssignmentButton taskId={task.id} refetch={handleRefetch} />
      </div>
    </div>
  );
};
