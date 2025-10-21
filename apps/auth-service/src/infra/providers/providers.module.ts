import { Module } from '@nestjs/common';
import { BcryptHashProvider } from './bcrypt-hash.provider';
import { JWTTokenProvider } from './jwt-token.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenProvider } from '@/app/domain/providers/token.provider';
import { HashProvider } from '@/app/domain/providers/hash.provider';

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
