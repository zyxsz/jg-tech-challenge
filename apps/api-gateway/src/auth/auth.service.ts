import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  AuthService as AuthServiceMS,
  Services,
} from '@repo/constants/services';
import { AuthServiceTypes } from '@repo/dtos/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  @Inject(Services.AUTH_SERVICE)
  private authClient: ClientProxy;

  async registerUser(
    data: AuthServiceTypes.RegisterUserInput,
  ): Promise<AuthServiceTypes.RegisterUserOutput> {
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
    data: AuthServiceTypes.LoginUserInput,
  ): Promise<AuthServiceTypes.LoginUserOutput> {
    try {
      const response = await firstValueFrom(
        this.authClient.send(AuthServiceMS.Messages.LOGIN_USER, data),
      );

      return response;
    } catch (err) {
      console.log('BLA', err);
      throw new RpcException(err);
    }
  }

  async validateToken(
    data: AuthServiceTypes.ValidateTokenInput,
  ): Promise<AuthServiceTypes.ValidateTokenOutput> {
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
    data: AuthServiceTypes.RefreshTokenInput,
  ): Promise<AuthServiceTypes.RefreshTokenOutput> {
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
