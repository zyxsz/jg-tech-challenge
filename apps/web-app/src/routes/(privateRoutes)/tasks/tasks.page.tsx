import { TasksService } from "@/api/services/tasks.service";
import { ErrorContainer } from "@/components/error-container";
import { Task } from "@/components/tasks/task";
import { TasksSkeleton } from "@/components/tasks/tasks-skeleton";
import { Button } from "@/components/ui/button";
import { usePaginationHook } from "@/hooks/use-pagination.hook";
import { useTasksFilterHook } from "@/hooks/use-tasks-filter.hook";
import { cn } from "@/lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

export const TasksPage = () => {
  const { page, limit, Components } = usePaginationHook();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", page, limit],
    queryFn: () => TasksService.getTasksWithPagination(page, limit),
    placeholderData: keepPreviousData,
  });
  const { filteredData, FilterComponents } = useTasksFilterHook({
    data: tasks?.data,
  });

  if (isLoading) return <TasksSkeleton />;
  if (error) return <ErrorContainer message={error.message} />;
  if (!tasks) return <ErrorContainer message={"Unable to fetch for tasks"} />;

  return (
    <div className="space-y-4 ">
      <header className="flex items-center justify-between gap-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            Tarefas
          </h1>
          <p className="text-muted-foreground text-sm">
            Veja a lista com todas as tarefas criadas até o momento.
          </p>
        </div>
        <Button variant="secondary" asChild>
          <Link to="/tasks/create">
            Criar nova tarefa <ArrowRightIcon />
          </Link>
        </Button>
      </header>

      <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between gap-2">
            <FilterComponents.SearchInput />

            <div className="flex items-center gap-2">
              <FilterComponents.StatusButton />

              <FilterComponents.OrderButton />
            </div>
          </div>
        </div>

        {filteredData.map((task) => (
          <Task task={task} key={task.id} />
        ))}

        <footer className="flex items-center justify-between gap-2 select-none max-sm:flex-col max-sm:items-center">
          <Components.PerPageLimit paginationData={tasks.pagination} />

          <div className="mt-4 flex items-center justify-end gap-2">
            <Components.PaginationComp paginationData={tasks.pagination} />
          </div>
        </footer>
      </div>
    </div>
  );
};
