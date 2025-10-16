import { Module } from '@nestjs/common';
import { AssignmentsController } from './assignments.controller';
import { AuthModule } from '@/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Services } from '@repo/microservices';
import { ConfigService } from '@nestjs/config';
import { AssignmentsService } from './assignments.service';

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
  providers: [AssignmentsService],
  controllers: [AssignmentsController],
})
export class AssignmentsModule {}
