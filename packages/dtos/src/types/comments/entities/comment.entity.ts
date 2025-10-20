export interface CommentEntity {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: Date;

  relations?: {
    author?: {
      id: string;
      email: string;
      username: string;
    };
  };
}
