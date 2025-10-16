import { TasksService } from "@/api/services/tasks.service";
import { ErrorContainer } from "@/components/error-container";
import { TaskDetails } from "@/components/tasks/task-details";
import { TaskDetailsSkeleton } from "@/components/tasks/task-details-skeleton";
import { TaskDetailsTabs } from "@/components/tasks/task-details-tabs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export const TaskDetailsPage = () => {
  const { taskId } = useParams({ from: "/privateRoutes/tasks/$taskId" });
  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => TasksService.getTask(taskId),
  });

  if (isLoading) return <TaskDetailsSkeleton />;
  if (error) return <ErrorContainer message={error.message} />;
  if (!task) return <ErrorContainer message={"Unable to fetch for task"} />;

  return (
    <div className="space-y-4">
      <TaskDetails task={task} />
      <TaskDetailsTabs task={task} />
    </div>
  );
};
