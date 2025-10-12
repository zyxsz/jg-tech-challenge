export enum Services {
  AUTH_SERVICE = "auth-service",
}

export namespace AuthService {
  export enum Messages {
    REGISTER_USER = "register-user",
    VALIDATE_TOKEN = "validate-token",
    LOGIN_USER = "login-user",
    REFRESH_TOKEN = "refresh-token",
  }
}
