import type { TaskPriority, TaskStatus } from "../../task.entity";

export interface CreateTaskBody {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  term: Date;
}
