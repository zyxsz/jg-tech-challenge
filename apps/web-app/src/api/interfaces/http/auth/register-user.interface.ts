export interface RegisterUserRequestBody {
  email: string;
  username: string;
  password: string;
}

export interface RegisterUserResponse {
  accessToken: string;
  refreshToken: string;
}
