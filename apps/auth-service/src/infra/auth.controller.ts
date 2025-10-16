import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '@repo/constants/services';
import { RegisterUserUseCase } from '@/app/use-cases/register-user.use-case';
import { LoginUseCase } from '@/app/use-cases/login.use-case';
import { AuthServiceTypes } from '@repo/dtos/types';
import { GenerateTokensUseCase } from '@/app/use-cases/generate-tokens.use-case';
import { RefreshTokensUseCase } from '@/app/use-cases/refresh-tokens.use-case';
import { ValidateTokenUseCase } from '@/app/use-cases/validate-token.use-case';
import {
  LoginUserDTO,
  RefreshTokenDTO,
  RegisterUserDTO,
  ValidateTokenDTO,
} from '@repo/dtos';

@Controller()
export class AuthController {
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
    @Payload() data: RegisterUserDTO.Microservice.Payload,
  ): Promise<AuthServiceTypes.RegisterUserOutput> {
    const user = await this.registerUserUseCase.execute(data);
    const tokens = await this.generateTokensUseCase.execute({
      userId: user.id,
    });

    return tokens;
  }

  @MessagePattern(AuthService.Messages.LOGIN_USER)
  async loginUser(
    @Payload() data: LoginUserDTO.Microservice.Payload,
  ): Promise<AuthServiceTypes.LoginUserOutput> {
    const user = await this.loginUseCase.execute(data);
    const tokens = await this.generateTokensUseCase.execute({
      userId: user.id,
    });

    return tokens;
  }

  @MessagePattern(AuthService.Messages.REFRESH_TOKEN)
  async refreshToken(
    @Payload() data: RefreshTokenDTO.Microservice.Payload,
  ): Promise<AuthServiceTypes.RefreshTokenOutput> {
    const tokens = await this.refreshTokensUseCase.execute(data);

    return tokens;
  }

  @MessagePattern(AuthService.Messages.VALIDATE_TOKEN)
  async validateToken(
    @Payload() data: ValidateTokenDTO.Microservice.Payload,
  ): Promise<AuthServiceTypes.ValidateTokenOutput> {
    try {
      const user = await this.validateTokenUseCase.execute(data);

      return {
        isValid: true,
        user,
      };
    } catch (err) {
      return { isValid: false, user: null };
    }
  }
}
