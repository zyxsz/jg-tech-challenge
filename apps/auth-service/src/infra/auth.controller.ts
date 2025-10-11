import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '@repo/microservices/constants/services';
import { RegisterUserDto } from './dtos/register-user.dto';
import { RegisterUserUseCase } from '@/app/use-cases/register-user.use-case';
import { LoginUserDto } from './dtos/login-user.dto';
import { LoginUseCase } from '@/app/use-cases/login.use-case';
import { AuthServiceTypes } from '@repo/microservices';
import { GenerateTokensUseCase } from '@/app/use-cases/generate-tokens.use-case';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RefreshTokensUseCase } from '@/app/use-cases/refresh-tokens.use-case';
import { ValidateTokenUseCase } from '@/app/use-cases/validate-token.use-case';
import { ValidateTokenDto } from './dtos/validate-token.dto';

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
    @Payload() data: RegisterUserDto,
  ): Promise<AuthServiceTypes.RegisterUserOutput> {
    const user = await this.registerUserUseCase.execute(data);
    const tokens = await this.generateTokensUseCase.execute({
      userId: user.id,
    });

    return tokens;
  }

  @MessagePattern(AuthService.Messages.LOGIN_USER)
  async loginUser(
    @Payload() data: LoginUserDto,
  ): Promise<AuthServiceTypes.LoginUserOutput> {
    const user = await this.loginUseCase.execute(data);
    const tokens = await this.generateTokensUseCase.execute({
      userId: user.id,
    });

    return tokens;
  }

  @MessagePattern(AuthService.Messages.REFRESH_TOKEN)
  async refreshToken(
    @Payload() data: RefreshTokenDto,
  ): Promise<AuthServiceTypes.RefreshTokenOutput> {
    const tokens = await this.refreshTokensUseCase.execute(data);

    return tokens;
  }

  @MessagePattern(AuthService.Messages.VALIDATE_TOKEN)
  async validateToken(
    @Payload() data: ValidateTokenDto,
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
