export enum Services {
  AUTH_SERVICE = "auth-service",
  TASKS_SERVICE = "tasks-service",
}

export namespace AuthService {
  export enum Messages {
    REGISTER_USER = "register-user",
    VALIDATE_TOKEN = "validate-token",
    LOGIN_USER = "login-user",
    REFRESH_TOKEN = "refresh-token",
  }
}

export namespace TasksService {
  export enum Messages {
    CREATE_TASK = "create-task",
    GET_TASK = "get-task",
    GET_TASKS_WITH_PAGINATIOn = "get-tasks-with-pagination",
    UPDATE_TASK = "update-task",
    DELETE_TASK = "delete-task",
  }
}
