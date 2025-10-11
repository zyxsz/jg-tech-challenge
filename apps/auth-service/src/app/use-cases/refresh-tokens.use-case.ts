import { addDays, addMinutes } from 'date-fns';
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
      addMinutes(new Date(), 15),
    );
    const refreshToken = await this.tokenProvider.generateToken(
      refreshTokenPayload,
      addDays(new Date(), 7),
    );

    return { accessToken, refreshToken };
  }
}
