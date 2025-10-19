export interface CommentEntity {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}
