export enum Services {
  AUTH_SERVICE = 'auth-service'
}


export namespace AuthService {
  export enum Messages {
    REGISTER_USER = 'register-user',
    AUTHENTICATE_USER = 'authenticate-user',
    VALIDATE_TOKEN = 'validate-token',
  }
}
