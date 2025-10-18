import { NotificationsService } from '@/shared/services/notifications.service';
import { Module } from '@nestjs/common';
import { RabbitMQNotificationsService } from './rabbitmq-notifications.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Services } from '@repo/constants/services';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: Services.NOTIFICATIONS_SERVICE,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.getOrThrow('RMQ_USER')}:${configService.getOrThrow('RMQ_PASS')}@${configService.getOrThrow('RMQ_HOST')}:${configService.getOrThrow('RMQ_PORT')}`,
            ],
            queue: Services.NOTIFICATIONS_SERVICE,
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    { provide: NotificationsService, useClass: RabbitMQNotificationsService },
  ],
  exports: [NotificationsService],
})
export class ServicesModule {}
