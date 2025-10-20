export interface AssignmentEntity {
  id: string;
  userId: string;
  taskId: string;
  assignedAt: Date;
  relations?: {
    user?: {
      id: string;
      username: string;
      email: string;
    };
  };
}
