import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  AuthService as AuthServiceMS,
  Services,
} from '@repo/constants/services';
import {
  LoginUserMessageInput,
  LoginUserMessageOutput,
  RefreshTokenMessageInput,
  RefreshTokenMessageOutput,
  RegisterUserMessageInput,
  RegisterUserMessageOutput,
  ValidateTokenMessageInput,
  ValidateTokenMessageOutput,
} from '@repo/dtos/auth';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  @Inject(Services.AUTH_SERVICE)
  private authClient: ClientProxy;

  async registerUser(
    data: RegisterUserMessageInput,
  ): Promise<RegisterUserMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.authClient.send(AuthServiceMS.Messages.REGISTER_USER, data),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async loginUser(
    data: LoginUserMessageInput,
  ): Promise<LoginUserMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.authClient.send(AuthServiceMS.Messages.LOGIN_USER, data),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async validateToken(
    data: ValidateTokenMessageInput,
  ): Promise<ValidateTokenMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.authClient.send(AuthServiceMS.Messages.VALIDATE_TOKEN, data),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async refreshToken(
    data: RefreshTokenMessageInput,
  ): Promise<RefreshTokenMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.authClient.send(AuthServiceMS.Messages.REFRESH_TOKEN, data),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
