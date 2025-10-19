export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

export interface TaskEntity {
  id: string;
  authorId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  term: Date;
  createdAt: Date;
}
