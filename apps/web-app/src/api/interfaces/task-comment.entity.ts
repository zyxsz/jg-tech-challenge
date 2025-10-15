import type { Relations } from "./relations.interface";

export interface TaskCommentRelations {
  author: { id: string; username: string; email: string };
}

export interface TaskComment extends Relations<TaskCommentRelations> {
  id: string;
  authorId: string;
  taskId: string;
  content: string;
  createdAt: string;
}
