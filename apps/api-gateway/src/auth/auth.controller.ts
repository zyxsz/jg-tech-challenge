import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedRoute } from './decorators/authenticated-route.decorator';
import { AuthenticatedUser } from './decorators/authenticated-user.decorator';
import type { UserType } from '@/shared/types/user';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthenticatedUserAuthSchema,
  AuthTokensExampleSchema,
} from '@/docs/examples/auth-example';
import {
  LoginUserBodyDTO,
  RefreshTokenBodyDTO,
  RegisterUserBodyDTO,
} from '@repo/dtos/auth';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 200,
    description: 'Cadastro realizado com sucesso',
    schema: AuthTokensExampleSchema,
  })
  @ApiResponse({
    status: 400,
    description:
      'Erro na validação dos campos | Não foi possível criar o usuário',
  })
  @ApiOperation({
    summary: 'Cadastro de usuário',
    description: 'Utilize esse endpoint para realizar o cadastro de um usuário',
  })
  async registerUser(@Body() body: RegisterUserBodyDTO) {
    const response = await this.authService.registerUser({
      email: body.email,
      password: body.password,
      username: body.username,
    });

    return response;
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    schema: AuthTokensExampleSchema,
  })
  @ApiResponse({ status: 400, description: 'Erro na validação dos campos' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiOperation({
    summary: 'Login de usuário',
    description: 'Utilize esse endpoint para realizar o login de um usuário',
  })
  async loginUser(@Body() body: LoginUserBodyDTO) {
    const response = await this.authService.loginUser({
      email: body.email,
      password: body.password,
    });

    return response;
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Tokens atualizados com sucesso',
    schema: AuthTokensExampleSchema,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos campos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não foi possível validar o seu token',
  })
  @ApiOperation({
    summary: 'Atualizar tokens',
    description: 'Utilize esse endpoint para a atualizar seus tokens',
  })
  async refreshToken(@Body() body: RefreshTokenBodyDTO) {
    const response = await this.authService.refreshToken({
      refreshToken: body.refreshToken,
    });

    return response;
  }

  @Get('/me')
  @AuthenticatedRoute()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Usuário está autenticado',
    schema: AuthenticatedUserAuthSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Token de acesso invalido',
  })
  @ApiOperation({
    summary: 'Buscar usuário',
    description:
      'Utilize esse endpoint para buscar as informações do usuário logado no momento',
  })
  me(@AuthenticatedUser() user: UserType) {
    return user;
  }
}
