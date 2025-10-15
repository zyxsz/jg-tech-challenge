import type { Relations } from "./relations.interface";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

export interface TaskRelations {
  author: { id: string; username: string; email: string };
}

export interface Task extends Relations<TaskRelations> {
  id: string;
  authorId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  term: string;
  createdAt: string;
}
