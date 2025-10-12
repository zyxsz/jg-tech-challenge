import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthServiceTypes,
  Services,
  AuthService as AuthServiceMS,
} from '@repo/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  @Inject(Services.AUTH_SERVICE)
  private authClient: ClientProxy;

  async registerUser(
    data: AuthServiceTypes.RegisterUserInput,
  ): Promise<AuthServiceTypes.RegisterUserOutput> {
    try {
      return lastValueFrom(
        this.authClient.send(AuthServiceMS.Messages.REGISTER_USER, data),
      );
    } catch (err) {
      console.log(err, JSON.stringify(err));

      throw err;
    }
  }

  async loginUser(
    data: AuthServiceTypes.LoginUserInput,
  ): Promise<AuthServiceTypes.LoginUserOutput> {
    try {
      return lastValueFrom(
        this.authClient.send(AuthServiceMS.Messages.LOGIN_USER, data),
      );
    } catch (err) {
      console.log(err, JSON.stringify(err));

      throw err;
    }
  }

  async validateToken(
    data: AuthServiceTypes.ValidateTokenInput,
  ): Promise<AuthServiceTypes.ValidateTokenOutput> {
    try {
      return lastValueFrom(
        this.authClient.send(AuthServiceMS.Messages.VALIDATE_TOKEN, data),
      );
    } catch (err) {
      console.log(err, JSON.stringify(err));

      throw err;
    }
  }

  async refreshToken(
    data: AuthServiceTypes.RefreshTokenInput,
  ): Promise<AuthServiceTypes.RefreshTokenOutput> {
    try {
      return lastValueFrom(
        this.authClient.send(AuthServiceMS.Messages.REFRESH_TOKEN, data),
      );
    } catch (err) {
      console.log(err, JSON.stringify(err));

      throw err;
    }
  }
}
