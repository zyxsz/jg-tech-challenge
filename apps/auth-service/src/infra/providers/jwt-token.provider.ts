import { TokenProvider } from '@/app/domain/providers/token.provider';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsError } from '@repo/errors/exceptions';

@Injectable()
export class JWTTokenProvider implements TokenProvider {
  constructor(private jwtService: JwtService) {}

  generateToken<T extends object>(
    payload: T,
    expiresIn: number,
  ): Promise<string> {
    try {
      const response = this.jwtService.signAsync<object>(payload, {
        expiresIn: expiresIn,
      });

      return response;
    } catch (err) {
      throw new InvalidCredentialsError(
        'Não foi possível criar o seu token de acesso',
      );
    }
  }

  async validateToken<T extends object>(token: string): Promise<T> {
    try {
      const response = await this.jwtService.verifyAsync<T>(token);

      return response;
    } catch (err) {
      throw new InvalidCredentialsError('Não foi possível validar o seu token');
    }
  }
}
