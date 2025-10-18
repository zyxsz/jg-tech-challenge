import { Module } from '@nestjs/common';
import { AssignmentsController } from './assignments.controller';
import { AuthModule } from '@/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AssignmentsService } from './assignments.service';
import { Services } from '@repo/constants/services';

@Module({
  imports: [
    AuthModule,
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
  providers: [AssignmentsService],
  controllers: [AssignmentsController],
})
export class AssignmentsModule {}
