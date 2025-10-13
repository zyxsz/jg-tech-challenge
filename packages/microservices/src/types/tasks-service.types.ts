export namespace TasksServiceTypes {
  export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

  export interface Task {
    id: string;
    authorId: string;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    term: Date;
    createdAt: Date;
  }

  // Get task

  export interface GetTaskInput {
    taskId: string;
  }
  export interface GetTaskOutput extends Task {}

  // Get tasks with pagination

  export interface GetTasksWithPaginationInput {
    page: number;
    limitPerPage: number;
  }

  export interface GetTasksWithPaginationOutput {
    data: Task[];
    pagination: {
      page: number;
      limitPerPage: number;
      totalPages: number;
      totalCount: number;
    };
  }

  // Create task

  export interface CreateTaskInput {
    authorId: string;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    term: Date;
  }

  export interface CreateTaskOutput extends Task {}

  // Update task

  export interface UpdateTaskInput {
    taskId: string;
    data: Partial<
      Pick<Task, "title" | "description" | "priority" | "status" | "term">
    >;
  }

  export interface UpdateTaskOutput extends Task {}

  // Delete task

  export interface DeleteTaskInput {
    taskId: string;
  }

  export interface DeleteTaskOutput {
    success: boolean;
  }
}
