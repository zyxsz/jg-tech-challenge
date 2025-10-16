import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedRoute } from './decorators/authenticated-route.decorator';
import { AuthenticatedUser } from './decorators/authenticated-user.decorator';
import type { UserType } from '@/shared/types/user';
import { LoginUserDTO, RefreshTokenDTO, RegisterUserDTO } from '@repo/dtos';

@Controller('/auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Post('/register')
  async registerUser(@Body() body: RegisterUserDTO.Http.Body) {
    const response = await this.authService.registerUser(body);

    return response;
  }

  @Post('/login')
  async loginUser(@Body() body: LoginUserDTO.Http.Body) {
    const response = await this.authService.loginUser(body);

    return response;
  }

  @Post('/refresh')
  async refreshToken(@Body() body: RefreshTokenDTO.Http.Body) {
    const response = await this.authService.refreshToken(body);

    return response;
  }

  @Get('/me')
  @AuthenticatedRoute()
  async me(@AuthenticatedUser() user: UserType) {
    return user;
  }
}
