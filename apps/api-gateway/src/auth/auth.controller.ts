import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthenticatedRoute } from './decorators/authenticated-route.decorator';
import { AuthenticatedUser } from './decorators/authenticated-user.decorator';
import type { UserType } from '@/shared/types/user';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('/auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Post('/register')
  async registerUser(@Body() body: RegisterUserDto) {
    const response = await this.authService.registerUser(body);

    return response;
  }

  @Post('/login')
  async loginUser(@Body() body: LoginUserDto) {
    const response = await this.authService.loginUser(body);

    return response;
  }

  @Post('/refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    const response = await this.authService.refreshToken(body);

    return response;
  }

  @Get('/me')
  @AuthenticatedRoute()
  async me(@AuthenticatedUser() user: UserType) {
    return user;
  }
}
