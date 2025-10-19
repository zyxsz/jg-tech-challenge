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
  export type GetTaskOutput = Task;

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
    authorId: string;
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

  export namespace Comments {
    export interface Comment {
      id: string;
      taskId: string;
      authorId: string;
      content: string;
      createdAt: Date;
    }

    // Create comment
    export interface CreateCommentInput {
      authorId: string;
      taskId: string;
      content: string;
    }

    export interface CreateCommentOutput extends Comment {}

    // Get comments with pagination
    export interface GetCommentWithPaginationInput {
      taskId: string;
      page: number;
      limitPerPage: number;
    }

    export interface GetCommentWithPaginationOutput {
      data: Comment[];
      pagination: {
        page: number;
        limitPerPage: number;
        totalPages: number;
        totalCount: number;
      };
    }
  }

  // Events

  export interface CreateUserEventPayload {
    id: string;
    email: string;
    username: string;
  }

  export namespace Assignments {
    export interface Entity {
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

    export interface CreateAssignmentInput {
      userId: string;
      taskId: string;
    }

    export interface CreateAssignmentOutput extends Entity {}

    export interface GetAssignmentsInput {
      taskId: string;
    }

    export interface GetAssignmentsOutput extends Array<Entity> {}
  }
}
