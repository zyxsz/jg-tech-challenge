import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth.controller';
import { UsersRepository } from '@/app/domain/repositories/users.repository';
import { RabbitMQNotificationsService } from './rabbitmq-notifications.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Services } from '@repo/constants/services';
import { NotificationsService } from '@/app/domain/services/notifications.service';
import { RegisterUserUseCase } from '@/app/domain/use-cases/register-user.use-case';
import { HashProvider } from '@/app/domain/providers/hash.provider';
import { LoginUseCase } from '@/app/domain/use-cases/login.use-case';
import { RefreshTokensUseCase } from '@/app/domain/use-cases/refresh-tokens.use-case';
import { TokenProvider } from '@/app/domain/providers/token.provider';
import { GenerateTokensUseCase } from '@/app/domain/use-cases/generate-tokens.use-case';
import { ValidateTokenUseCase } from '@/app/domain/use-cases/validate-token.use-case';

@Module({
  imports: [
    DatabaseModule,
    ProvidersModule,
    ClientsModule.registerAsync([
      {
        name: Services.TASKS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.getOrThrow('RMQ_USER')}:${configService.getOrThrow('RMQ_PASS')}@${configService.getOrThrow('RMQ_HOST')}:${configService.getOrThrow('RMQ_PORT')}`,
            ],
            queue: Services.TASKS_SERVICE,
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    { provide: NotificationsService, useClass: RabbitMQNotificationsService },
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
