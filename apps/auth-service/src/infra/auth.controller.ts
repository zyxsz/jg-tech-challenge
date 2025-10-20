import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '@repo/constants/services';
import { RegisterUserUseCase } from '@/app/use-cases/register-user.use-case';
import { LoginUseCase } from '@/app/use-cases/login.use-case';
import { GenerateTokensUseCase } from '@/app/use-cases/generate-tokens.use-case';
import { RefreshTokensUseCase } from '@/app/use-cases/refresh-tokens.use-case';
import { ValidateTokenUseCase } from '@/app/use-cases/validate-token.use-case';
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
import { NotificationsService } from '@/app/services/notifications.service';

@Controller()
export class AuthController {
  // Services

  @Inject()
  private notificationsService: NotificationsService;

  // Use cases

  @Inject()
  private registerUserUseCase: RegisterUserUseCase;

  @Inject()
  private loginUseCase: LoginUseCase;

  @Inject()
  private refreshTokensUseCase: RefreshTokensUseCase;

  @Inject()
  private generateTokensUseCase: GenerateTokensUseCase;

  @Inject()
  private validateTokenUseCase: ValidateTokenUseCase;

  @MessagePattern(AuthService.Messages.REGISTER_USER)
  async registerUser(
    @Payload() data: RegisterUserMessageInput,
  ): Promise<RegisterUserMessageOutput> {
    const user = await this.registerUserUseCase.execute(data);
    const tokens = await this.generateTokensUseCase.execute({
      userId: user.id,
    });

    if (this.notificationsService) {
      this.notificationsService.emitCreateUser({
        user,
      });
    }

    return tokens;
  }

  @MessagePattern(AuthService.Messages.LOGIN_USER)
  async loginUser(
    @Payload() data: LoginUserMessageInput,
  ): Promise<LoginUserMessageOutput> {
    console.log(data);

    const user = await this.loginUseCase.execute(data);
    const tokens = await this.generateTokensUseCase.execute({
      userId: user.id,
    });

    return tokens;
  }

  @MessagePattern(AuthService.Messages.REFRESH_TOKEN)
  async refreshToken(
    @Payload() data: RefreshTokenMessageInput,
  ): Promise<RefreshTokenMessageOutput> {
    const tokens = await this.refreshTokensUseCase.execute(data);

    return tokens;
  }

  @MessagePattern(AuthService.Messages.VALIDATE_TOKEN)
  async validateToken(
    @Payload() data: ValidateTokenMessageInput,
  ): Promise<ValidateTokenMessageOutput> {
    try {
      const user = await this.validateTokenUseCase.execute(data);

      return {
        isValid: true,
        user,
      };
    } catch {
      return { isValid: false, user: null };
    }
  }
}
