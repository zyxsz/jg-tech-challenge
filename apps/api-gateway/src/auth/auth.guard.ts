import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token de acesso invalido');
    }
    try {
      const tokenResponse = await this.authService.validateToken({
        accessToken: token,
      });

      if (!tokenResponse.isValid) throw new UnauthorizedException();
      if (!tokenResponse.user) throw new UnauthorizedException();

      request['userId'] = tokenResponse.user.id;
      request['user'] = tokenResponse.user;
    } catch (err) {
      throw new UnauthorizedException('Token de acesso invalido');
    }

    return true;
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
