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
import { LoginUserDTO, RefreshTokenDTO, RegisterUserDTO } from '@repo/dtos';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthenticatedUserAuthSchema,
  AuthTokensExampleSchema,
} from '@/docs/examples/auth-example';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  constructor() {}

  //a

  @Post('/register')
  @ApiBody({
    type: RegisterUserDTO.Http.Body,
  })
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
  async registerUser(@Body() body: RegisterUserDTO.Http.Body) {
    const response = await this.authService.registerUser(body);

    return response;
  }

  @Post('/login')
  @ApiBody({
    type: LoginUserDTO.Http.Body,
  })
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
  async loginUser(@Body() body: LoginUserDTO.Http.Body) {
    const response = await this.authService.loginUser(body);

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
  async refreshToken(@Body() body: RefreshTokenDTO.Http.Body) {
    const response = await this.authService.refreshToken(body);

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
  async me(@AuthenticatedUser() user: UserType) {
    return user;
  }
}
