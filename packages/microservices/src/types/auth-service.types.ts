export namespace AuthServiceTypes {
  // Register

  export interface RegisterUserInput {
    email: string;
    username: string;
    password: string;
  }

  export interface RegisterUserOutput {
    accessToken: string;
    refreshToken: string;
  }

  // Login

  export interface LoginUserInput {
    email: string;
    password: string;
  }

  export interface LoginUserOutput {
    accessToken: string;
    refreshToken: string;
  }

  // Refresh

  export interface RefreshTokenInput {
    refreshToken: string;
  }

  export interface RefreshTokenOutput {
    accessToken: string;
    refreshToken: string;
  }

  // Validate token

  export interface ValidateTokenInput {
    accessToken: string;
  }

  export type ValidateTokenOutput =
    | {
        isValid: true;
        user: {
          id: string;
          username: string;
          email: string;
          updatedAt: Date;
          createdAt: Date;
        };
      }
    | { isValid: false; user: null };

  export interface CreateUserEventPayload {
    id: string;
    email: string;
    username: string;
  }
}
