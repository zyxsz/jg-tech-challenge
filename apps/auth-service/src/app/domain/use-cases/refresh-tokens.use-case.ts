import { TokenProvider } from '@/app/domain/providers/token.provider';
import { UnauthorizedError } from '@repo/errors/exceptions';
import { UsersRepository } from '../repositories/users.repository';

export interface RefreshTokensInput {
  refreshToken: string;
}

export interface RefreshTokensOutput {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokensUseCase {
  constructor(
    private tokenProvider: TokenProvider,
    private usersRepository: UsersRepository,
  ) {}

  async execute(input: RefreshTokensInput): Promise<RefreshTokensOutput> {
    const tokenPayload = await this.tokenProvider.validateToken<{
      refreshTokenUserId: string;
    }>(input.refreshToken);

    if (!tokenPayload) throw new UnauthorizedError('Refresh token invalido');
    if (!tokenPayload.refreshTokenUserId)
      throw new UnauthorizedError('Conteúdo do refresh token é invalido');

    const user = await this.usersRepository.findById(
      tokenPayload.refreshTokenUserId,
    );

    const accessTokenPayload = {
      accessTokenUserId: user.id,
    };
    const refreshTokenPayload = {
      refreshTokenUserId: user.id,
    };

    const accessToken = await this.tokenProvider.generateToken(
      accessTokenPayload,
      60 * 15, // 15 minutos
    );
    const refreshToken = await this.tokenProvider.generateToken(
      refreshTokenPayload,
      60 * 60 * 24 * 7, // 7 dias
    );

    return { accessToken, refreshToken };
  }
}
