import { api } from ".";
import type { GetAuthenticatedUserResponse } from "../interfaces/http/auth/get-authenticated-user.interface";
import type {
  LoginUserRequestBody,
  LoginUserResponse,
} from "../interfaces/http/auth/login-user.interface";
import type {
  RefreshTokenRequestBody,
  RefreshTokenResponse,
} from "../interfaces/http/auth/refresh-token.interface";
import type {
  RegisterUserRequestBody,
  RegisterUserResponse,
} from "../interfaces/http/auth/register-user.interface";

export class AuthService {
  static async getAuthenticatedUser() {
    return api
      .get<GetAuthenticatedUserResponse>("/auth/me")
      .then((response) => response.data);
  }

  static async loginUser(body: LoginUserRequestBody) {
    return api
      .post<LoginUserResponse>("/auth/login", body)
      .then((response) => response.data);
  }

  static async registerUser(body: RegisterUserRequestBody) {
    return api
      .post<RegisterUserResponse>("/auth/register", body)
      .then((response) => response.data);
  }

  static async refreshToken(body: RefreshTokenRequestBody) {
    return api
      .post<RefreshTokenResponse>("/auth/refresh", body)
      .then((response) => response.data);
  }
}
