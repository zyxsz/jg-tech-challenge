import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  AuthService as AuthServiceMS,
  Services,
} from '@repo/constants/services';
import {
  ValidateTokenMessageInput,
  ValidateTokenMessageOutput,
} from '@repo/dtos/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  @Inject(Services.AUTH_SERVICE)
  private authClient: ClientProxy;

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
}
