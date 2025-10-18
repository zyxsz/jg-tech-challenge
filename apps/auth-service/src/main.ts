import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AsyncOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { BaseExceptionFilter } from '@repo/errors/filters';
import { ConfigService } from '@nestjs/config';
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
          queue: Services.AUTH_SERVICE,
          queueOptions: {
            durable: false,
          },
        },
      };
    },
    inject: [ConfigService],
  });

  app.useGlobalFilters(new BaseExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}
bootstrap();
