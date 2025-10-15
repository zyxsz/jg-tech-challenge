import type { TaskPriority, TaskStatus } from "../../task.entity";

export interface UpdateTaskBody {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  term: Date;
}
