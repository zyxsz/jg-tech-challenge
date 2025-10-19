export namespace TasksService {
  export enum Events {
    CREATE_USER = "create-user",
    TASK_CREATED = "task.created",
    TASK_ASSIGNMENT_CREATED = "task.assignment.created",
    TASK_UPDATED = "task.updated",
    TASK_COMMENT_CREATED = "task.comment.created",
  }

  export enum Messages {
    CREATE_TASK = "create-task",
    GET_TASK = "get-task",
    GET_TASKS_WITH_PAGINATIOn = "get-tasks-with-pagination",
    UPDATE_TASK = "update-task",
    DELETE_TASK = "delete-task",
  }

  export namespace Comments {
    export enum Messages {
      CREATE_COMMENT = "create-comment",
      GET_COMMENTS_WITH_PAGINATION = "get-comments-with-pagination",
    }
  }

  export namespace Assignments {
    export enum Messages {
      CREATE_ASSIGNMENT = "create-assignment",
      GET_ASSIGNMENTS = "get-assignments",
    }
  }
}
