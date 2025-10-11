import { HashProvider } from '@/app/providers/hash.provider';
import { Module } from '@nestjs/common';
import { BcryptHashProvider } from './bcrypt-hash.provider';
import { TokenProvider } from '@/app/providers/token.provider';
import { JWTTokenProvider } from './jwt-token.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    { provide: HashProvider, useClass: BcryptHashProvider },
    { provide: TokenProvider, useClass: JWTTokenProvider },
  ],
  exports: [HashProvider, TokenProvider],
})
export class ProvidersModule {}
