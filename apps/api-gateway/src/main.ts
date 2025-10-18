import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { CustomRpcExceptionFilter } from '@repo/errors/filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoginUserDTO, RegisterUserDTO } from '@repo/dtos';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Tarefas')
    .setDescription('Um sistema de tarefas colaborativo')
    .setVersion('1.0')
    .addTag('tasks')
    .addBearerAuth()
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
    })

    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      extraModels: [LoginUserDTO.Http.Body, RegisterUserDTO.Http.Body],
    });
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(configService.get('PORT') ?? 3333);
}
bootstrap();
