import type { Relations } from "./relations.interface";

export interface AssignmentRelations {
  user: { id: string; username: string; email: string };
}

export interface Assignment extends Relations<AssignmentRelations> {
  id: string;
  userId: string;
  taskId: string;
  assignedAt: string;
}
