import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth.controller';
import { RegisterUserUseCase } from '@/app/use-cases/register-user.use-case';
import { LoginUseCase } from '@/app/use-cases/login.use-case';
import { RefreshTokensUseCase } from '@/app/use-cases/refresh-tokens.use-case';
import { GenerateTokensUseCase } from '@/app/use-cases/generate-tokens.use-case';
import { ValidateTokenUseCase } from '@/app/use-cases/validate-token.use-case';

@Module({
  imports: [DatabaseModule, ProvidersModule],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,
    LoginUseCase,
    RefreshTokensUseCase,
    GenerateTokensUseCase,
    ValidateTokenUseCase,
  ],
})
export class AuthModule {}
