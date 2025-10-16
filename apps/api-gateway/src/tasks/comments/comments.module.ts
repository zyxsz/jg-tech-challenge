import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { AuthModule } from '@/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Services } from '@repo/constants/services';

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: Services.TASKS_SERVICE,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            url: configService.get('TASKS_SERVICE_URL'),
            port: parseInt(configService.getOrThrow('TASKS_SERVICE_PORT')),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
