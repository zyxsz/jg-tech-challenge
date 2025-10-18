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
import { NotificationsService } from '@/app/services/notifications.service';
import { RabbitMQNotificationsService } from './rabbitmq-notifications.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Services } from '@repo/constants/services';

@Module({
  imports: [
    DatabaseModule,
    ProvidersModule,
    ClientsModule.registerAsync([
      {
        name: Services.TASKS_SERVICE,
        useFactory: async (configService: ConfigService) => ({
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
        notificationsService: NotificationsService,
      ) => {
        return new RegisterUserUseCase(
          usersRepository,
          hashProvider,
          notificationsService,
        );
      },
      inject: [UsersRepository, HashProvider, NotificationsService],
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
