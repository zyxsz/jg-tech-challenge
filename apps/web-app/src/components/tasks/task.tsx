import type { Task as TaskType } from "@/api/interfaces/task.entity";
import { Tag } from "../tag";
import { ArrowRightIcon, CalendarIcon, UserPlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
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
import { distanceToNow, formatDate } from "@/lib/date";
import { parseISO } from "date-fns";

interface Props {
  task: TaskType;
}

export const Task = ({ task }: Props) => {
  const PriorityButton = () => {
    return (
      <Tag
        tooltip={
          <p>
            <TaskPriorityDescription priority={task.priority} />
          </p>
        }
      >
        <TaskPriorityIcon priority={task.priority} />
        <span className="max-sm:hidden">
          <TaskPriorityLabel priority={task.priority} />
        </span>
      </Tag>
    );
  };
  const StatusButton = () => {
    return (
      <Tag
        tooltip={
          <p>
            <TaskStatusDescription status={task.status} />
          </p>
        }
      >
        <TaskStatusIcon status={task.status} />
        <TaskStatusLabel status={task.status} />
      </Tag>
    );
  };
  const TermButton = () => {
    return (
      <Tag
        tooltip={
          <p>
            O prazo da tarefa foi definido para:{" "}
            <strong>{formatDate(parseISO(task.term))}</strong>
          </p>
        }
      >
        <CalendarIcon />
        {distanceToNow(parseISO(task.term))}
      </Tag>
    );
  };

  return (
    <div key={task.id} className="p-4 border rounded-md bg-card">
      <header className="flex items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold max-sm:max-w-32 overflow-ellipsis overflow-hidden">
              {task.title}
            </h3>
            {task.relations?.author && (
              <Tag
                tooltip={
                  <p>
                    Tarefa criada por{" "}
                    <strong>{task.relations.author.username}</strong>
                  </p>
                }
              >
                <UserPlusIcon />
              </Tag>
            )}
          </div>
          <p className="text-muted-foreground text-sm text-ellipsis overflow-hidden line-clamp-1 max-sm:max-w-32">
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
          <PriorityButton />
          <StatusButton />
          <TermButton />
        </div>
      </footer>
    </div>
  );
};
