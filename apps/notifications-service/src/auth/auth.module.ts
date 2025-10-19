import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { Services } from '@repo/constants/services';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: Services.AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.getOrThrow('RMQ_USER')}:${configService.getOrThrow('RMQ_PASS')}@${configService.getOrThrow('RMQ_HOST')}:${configService.getOrThrow('RMQ_PORT')}`,
            ],
            queue: Services.AUTH_SERVICE,
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
