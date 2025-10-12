import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth.controller';
import { RegisterUserUseCase } from '@/app/use-cases/register-user.use-case';
import { LoginUseCase } from '@/app/use-cases/login.use-case';
import { RefreshTokensUseCase } from '@/app/use-cases/refresh-tokens.use-case';
import { GenerateTokensUseCase } from '@/app/use-cases/generate-tokens.use-case';
import { ValidateTokenUseCase } from '@/app/use-cases/validate-token.use-case';
import { UsersRepository } from '@/app/domain/repositories/users.repository';
import { HashProvider } from '@/app/providers/hash.provider';
import { TokenProvider } from '@/app/providers/token.provider';

@Module({
  imports: [DatabaseModule, ProvidersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: RegisterUserUseCase,
      useFactory: (
        usersRepository: UsersRepository,
        hashProvider: HashProvider,
      ) => {
        return new RegisterUserUseCase(usersRepository, hashProvider);
      },
      inject: [UsersRepository, HashProvider],
    },
    {
      provide: LoginUseCase,
      useFactory: (
        usersRepository: UsersRepository,
        hashProvider: HashProvider,
      ) => {
        return new LoginUseCase(usersRepository, hashProvider);
      },
      inject: [UsersRepository, HashProvider],
    },
    {
      provide: RefreshTokensUseCase,
      useFactory: (
        usersRepository: UsersRepository,
        tokenProvider: TokenProvider,
      ) => {
        return new RefreshTokensUseCase(tokenProvider, usersRepository);
      },
      inject: [UsersRepository, TokenProvider],
    },
    {
      provide: GenerateTokensUseCase,
      useFactory: (tokenProvider: TokenProvider) => {
        return new GenerateTokensUseCase(tokenProvider);
      },
      inject: [TokenProvider],
    },

    {
      provide: ValidateTokenUseCase,
      useFactory: (
        usersRepository: UsersRepository,
        tokenProvider: TokenProvider,
      ) => {
        return new ValidateTokenUseCase(usersRepository, tokenProvider);
      },
      inject: [UsersRepository, TokenProvider],
    },
  ],
})
export class AuthModule {}
