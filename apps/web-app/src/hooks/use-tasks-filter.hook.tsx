import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "@/api/interfaces/task.entity";
import { TaskStatusLabel } from "@/components/formatters/task-status.formatter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { parseISO } from "date-fns";
import { CheckIcon, FunnelIcon, SortAscIcon, SortDescIcon } from "lucide-react";
import {
  parseAsArrayOf,
  parseAsStringEnum,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs";

interface Props {
  data?: Task[];
}

// Sort options

export enum TaskSortBy {
  status = "STATUS",
  createdAt = "CREATED_AT",
  priority = "PRIORITY",
}
export enum TaskSortOrder {
  asc = "ASC",
  desc = "DESC",
}

// Sort values

const StatusSortValue: Record<TaskStatus, number> = {
  TODO: 0,
  REVIEW: 1,
  IN_PROGRESS: 2,
  DONE: 3,
};

const PrioritySortValue: Record<TaskPriority, number> = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
  URGENT: 3,
};

// Timeout
let searchTimeout: NodeJS.Timeout;

// Hook & comps
export const useTasksFilterHook = ({ data }: Props) => {
  const allStatus = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"] as const;

  const [status, setStatus] = useQueryState(
    "status",
    parseAsArrayOf(parseAsStringLiteral(allStatus)).withDefault([
      "TODO",
      "IN_PROGRESS",
      "REVIEW",
      "DONE",
    ] as const)
  );
  const [sortOrder, setSortOrder] = useQueryState(
    "sortOrder",
    parseAsStringEnum<TaskSortOrder>(Object.values(TaskSortOrder)).withDefault(
      TaskSortOrder.desc
    )
  );
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsStringEnum<TaskSortBy>(Object.values(TaskSortBy)).withDefault(
      TaskSortBy.priority
    )
  );
  const [search, setSearch] = useQueryState("search");

  const filteredData =
    data?.filter((task) => {
      if (status.includes(task.status)) {
        return true;
      } else {
        return false;
      }
    }) || [];

  const sortedData = filteredData.sort((a, b) => {
    if (sortBy === TaskSortBy.createdAt) {
      if (sortOrder === TaskSortOrder.asc) {
        return (
          parseISO(a.createdAt).getTime() - parseISO(b.createdAt).getTime()
        );
      } else {
        return (
          parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime()
        );
      }
    } else if (sortBy === TaskSortBy.status) {
      if (sortOrder === TaskSortOrder.asc) {
        return StatusSortValue[a.status] - StatusSortValue[b.status];
      } else {
        return StatusSortValue[b.status] - StatusSortValue[a.status];
      }
    } else if (sortBy === TaskSortBy.priority) {
      if (sortOrder === TaskSortOrder.asc) {
        return PrioritySortValue[a.priority] - PrioritySortValue[b.priority];
      } else {
        return PrioritySortValue[b.priority] - PrioritySortValue[a.priority];
      }
    }

    return -1;
  });

  const filteredAndSortedDataWithSearch = search
    ? sortedData.filter((task) => {
        if (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        )
          return true;

        return false;
      })
    : sortedData;

  // Components

  const SearchInput = () => {
    const handleSearch = (value: string) => {
      if (searchTimeout) clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        setSearch(value);
      }, 500);
    };

    return (
      <Input
        placeholder="Buscar"
        defaultValue={search || ""}
        onChange={(e) => handleSearch(e.target.value)}
      />
    );
  };

  const StatusButton = () => {
    const handleSelectStatus = (status: TaskStatus) => {
      setStatus((state) => {
        if (state.includes(status)) {
          return state
            .map((s) => {
              if (s === status) {
                return null;
              }

              return s;
            })
            .filter((v) => v !== null);
        }

        return [...state, status];
      });
    };

    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            Status <FunnelIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="end">
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {allStatus.map((st, index) => (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelectStatus(st);
              }}
              className="gap-6 justify-between cursor-pointer"
              key={index}
            >
              <TaskStatusLabel status={st} />
              {status.includes(st) && <CheckIcon />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const OrderButton = () => {
    const handleChangeSortOrder = (order: "asc" | "desc") => {
      setSortOrder(TaskSortOrder[order]);
    };

    const handleChangeSortOrderBy = (by: keyof typeof TaskSortBy) => {
      setSortBy(TaskSortBy[by]);
    };

    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            Ordem{" "}
            {sortOrder === TaskSortOrder.asc ? (
              <SortAscIcon />
            ) : (
              <SortDescIcon />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="end">
          <DropdownMenuLabel>Ordem</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleChangeSortOrder("asc");
            }}
            className={cn(
              "gap-6 justify-between cursor-pointer",
              sortOrder === TaskSortOrder.asc && "opacity-20"
            )}
          >
            Ascendente <SortAscIcon />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleChangeSortOrder("desc");
            }}
            className={cn(
              "gap-6 justify-between cursor-pointer",
              sortOrder === TaskSortOrder.desc && "opacity-20"
            )}
          >
            Descendente <SortDescIcon />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {(
            Object.keys(TaskSortBy) as unknown as (keyof typeof TaskSortBy)[]
          ).map((by, index) => (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleChangeSortOrderBy(by);
              }}
              className="gap-6 justify-between cursor-pointer"
              key={index}
            >
              {by}
              {sortBy === TaskSortBy[by] && <CheckIcon />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return {
    filteredData: filteredAndSortedDataWithSearch,
    FilterComponents: { SearchInput, StatusButton, OrderButton },
  };
};
