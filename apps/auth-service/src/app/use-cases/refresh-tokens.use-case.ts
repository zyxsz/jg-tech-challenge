import { TokenProvider } from '../providers/token.provider';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { UsersRepository } from '../domain/repositories/users.repository';

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
      userId: string;
    }>(input.refreshToken);

    if (!tokenPayload) throw new UnauthorizedError('Invalid refreshToken');
    if (!tokenPayload.userId)
      throw new UnauthorizedError('Invalid refreshToken payload');

    const user = await this.usersRepository.findById(tokenPayload.userId);

    const accessTokenPayload = {
      userId: user.id,
    };
    const refreshTokenPayload = {
      userId: user.id,
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
