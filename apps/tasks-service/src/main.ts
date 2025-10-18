import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  AsyncOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import 'reflect-metadata';
import { BaseExceptionFilter } from '@repo/errors/filters';
import { Services } from '@repo/constants/services';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<
    AsyncOptions<MicroserviceOptions>
  >(AppModule, {
    useFactory: (configService: ConfigService) => {
      return {
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
      };
    },
    inject: [ConfigService],
  });

  app.useGlobalFilters(new BaseExceptionFilter());

  await app.listen();
}
bootstrap();
