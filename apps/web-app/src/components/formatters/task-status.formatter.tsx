import type { TaskStatus } from "@/api/interfaces/task.entity";
import { ListTodoIcon } from "lucide-react";
import type { ReactNode } from "react";

const label: Record<TaskStatus, ReactNode> = {
  TODO: "A ser feita",
  DONE: "Concluída",
  IN_PROGRESS: "Em progresso",
  REVIEW: "Em revisão",
};

export const TaskStatusLabel = ({ status }: { status: TaskStatus }) => {
  return label[status];
};

const description: Record<TaskStatus, ReactNode> = {
  TODO: "A tarefa está aguardando ser concluída",
  DONE: "A tarefa foi concluída",
  IN_PROGRESS: "A tarefa está em progresso",
  REVIEW: "A tarefa está em revisão",
};

export const TaskStatusDescription = ({ status }: { status: TaskStatus }) => {
  return description[status];
};

const icon: Record<TaskStatus, ReactNode> = {
  DONE: <ListTodoIcon className="[&_path:nth-child(4)]:text-green-500" />,
  IN_PROGRESS: (
    <ListTodoIcon className="[&_path:nth-child(4)]:text-yellow-600" />
  ),
  REVIEW: <ListTodoIcon className="[&_path:nth-child(4)]:text-yellow-400" />,
  TODO: <ListTodoIcon />,
};

export const TaskStatusIcon = ({ status }: { status: TaskStatus }) => {
  return icon[status];
};
