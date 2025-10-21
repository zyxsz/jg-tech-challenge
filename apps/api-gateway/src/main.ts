import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { CustomRpcExceptionFilter } from '@repo/errors/filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Tarefas')
    .setDescription('Um sistema de tarefas colaborativo')
    .setVersion('1.0')
    .addBearerAuth()
    .setBasePath('/api')
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
    })

    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(configService.get('PORT') ?? 3333);

  console.log(
    `Docs running at http://localhost:${configService.get('PORT') ?? 3333}/api/docs`,
  );
}
bootstrap();
