import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Services } from '@repo/constants/services';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: Services.AUTH_SERVICE,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            url: configService.get('AUTH_SERVICE_URL'),
            port: parseInt(configService.getOrThrow('AUTH_SERVICE_PORT')),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
