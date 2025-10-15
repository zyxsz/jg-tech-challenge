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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { distanceToNow, formatDate } from "@/lib/date";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { parseISO } from "date-fns";
import {
  ArrowRightIcon,
  CalendarIcon,
  CalendarPlus2Icon,
  ChevronDownIcon,
  ListTodoIcon,
  UserPlusIcon,
  Users2Icon,
} from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { Fragment } from "react/jsx-runtime";

export const TasksPage = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(5)
  );

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks", page, limit],
    queryFn: () => TasksService.getTasksWithPagination(page, limit),
    placeholderData: keepPreviousData,
  });

  const hasBefore = (tasks?.pagination.page || 0) > 1;
  const hasNext =
    (tasks?.pagination.totalPages || 0) > (tasks?.pagination.page || 0);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleNextPage = () => {
    if (!tasks?.pagination) return;
    if (tasks.pagination.page >= tasks.pagination.totalPages) return;

    setPage((state) => state + 1);
  };

  const handlePrevPage = () => {
    if (!tasks?.pagination) return;
    if (tasks.pagination.page <= 1) return;

    setPage((state) => state - 1);
  };

  const handleChangeLimit = (limit: 5 | 15 | 30 | 60 | 100) => {
    setLimit(limit);
  };

  return (
    <div className="space-y-4">
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
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="space-y-2">
          {tasks?.data.map((task) => (
            <div key={task.id} className="p-4 border rounded-md bg-card">
              <header className="flex items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{task.title}</h3>
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
                  </div>
                  <p className="text-muted-foreground text-sm text-ellipsis overflow-hidden line-clamp-1">
                    {task.description}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="link" asChild>
                    <Link to="/tasks/$taskId" params={{ taskId: task.id }}>
                      Ver detalhes <ArrowRightIcon />
                    </Link>
                  </Button>
                </div>
              </header>

              <footer className="mt-2">
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Tag>
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

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Tag>
                        <CalendarIcon />
                        {distanceToNow(parseISO(task.term))}
                      </Tag>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={4}>
                      <p>
                        O prazo da tarefa foi definido para:{" "}
                        <strong>{formatDate(parseISO(task.term))}</strong>
                      </p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Tag>
                        <Users2Icon />
                      </Tag>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={4}>
                      <p className="mb-2">Tarefa associada a:</p>
                      <ul>
                        <li>
                          <p>Admin</p>
                        </li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </footer>
            </div>
          ))}

          <footer className="flex items-center justify-between gap-2 select-none">
            <p className="text-sm text-muted-foreground">
              Mostrando{" "}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm">
                    {limit}
                    <ChevronDownIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleChangeLimit(5)}>
                    5
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleChangeLimit(15)}>
                    15
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleChangeLimit(30)}>
                    30
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleChangeLimit(60)}>
                    60
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleChangeLimit(100)}>
                    100
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>{" "}
              resultados por página.
            </p>

            {tasks?.pagination && (
              <div className="mt-4 flex items-center justify-end gap-2">
                <Pagination className="w-auto mx-0">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        disabled={!hasBefore}
                        onClick={() => handlePrevPage()}
                      />
                    </PaginationItem>
                    {hasBefore && (
                      <PaginationItem>
                        <PaginationButton
                          onClick={() =>
                            handleChangePage(tasks.pagination.page - 1)
                          }
                        >
                          {tasks.pagination.page - 1}
                        </PaginationButton>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationButton isActive>
                        {tasks.pagination.page}
                      </PaginationButton>
                    </PaginationItem>
                    {hasNext && (
                      <PaginationItem>
                        <PaginationButton
                          onClick={() =>
                            handleChangePage(tasks.pagination.page + 1)
                          }
                        >
                          {tasks.pagination.page + 1}
                        </PaginationButton>
                      </PaginationItem>
                    )}

                    <PaginationNext
                      disabled={!hasNext}
                      onClick={() => handleNextPage()}
                    />
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </footer>
        </div>
      )}
    </div>
  );
};
