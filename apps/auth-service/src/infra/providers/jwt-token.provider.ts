import { TokenProvider } from '@/app/providers/token.provider';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTTokenProvider implements TokenProvider {
  constructor(private jwtService: JwtService) {}

  generateToken<T extends object>(
    payload: T,
    expiresIn: number,
  ): Promise<string> {
    return this.jwtService.signAsync<object>(payload, {
      expiresIn: expiresIn,
    });
  }

  validateToken<T extends object>(token: string): Promise<T> {
    return this.jwtService.verifyAsync<T>(token);
  }
}
