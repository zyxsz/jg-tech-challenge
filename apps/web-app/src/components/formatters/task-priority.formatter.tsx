import type { TaskPriority, TaskStatus } from "@/api/interfaces/task.entity";
import { ClockIcon, DotIcon, ListTodoIcon } from "lucide-react";
import type { ReactNode } from "react";

const label: Record<TaskPriority, ReactNode> = {
  HIGH: "Prioridade alta",
  LOW: "Prioridade baixa",
  MEDIUM: "Prioridade media",
  URGENT: "Prioridade urgente",
};

export const TaskPriorityLabel = ({ priority }: { priority: TaskPriority }) => {
  return label[priority];
};

const description: Record<TaskPriority, ReactNode> = {
  HIGH: "A tarefa foi definida como prioridade alta",
  LOW: "A tarefa foi definida como prioridade baixa",
  MEDIUM: "A tarefa foi definida como prioridade media",
  URGENT: "A tarefa foi definida como prioridade urgente",
};

export const TaskPriorityDescription = ({
  priority,
}: {
  priority: TaskPriority;
}) => {
  return description[priority];
};

const icon: Record<TaskPriority, ReactNode> = {
  HIGH: <ClockIcon className="text-yellow-600" />,
  LOW: <ClockIcon />,
  MEDIUM: <ClockIcon className="text-yellow-300" />,
  URGENT: <ClockIcon className="text-red-500" />,
};

export const TaskPriorityIcon = ({ priority }: { priority: TaskPriority }) => {
  return icon[priority];
};
