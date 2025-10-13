import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  AsyncOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<
    AsyncOptions<MicroserviceOptions>
  >(AppModule, {
    useFactory: (configService: ConfigService) => {
      const port = configService.get('PORT');
      return {
        transport: Transport.TCP,
        options: {
          port: port ? parseInt(port) : 4002,
        },
      };
    },
    inject: [ConfigService],
  });

  await app.listen();
}
bootstrap();
