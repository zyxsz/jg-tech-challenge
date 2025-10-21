import { TokenProvider } from '../providers/token.provider';

export interface GenerateTokensInput {
  userId: string;
}

export interface GenerateTokensOutput {
  accessToken: string;
  refreshToken: string;
}

export class GenerateTokensUseCase {
  constructor(private tokenProvider: TokenProvider) {}

  async execute(input: GenerateTokensInput): Promise<GenerateTokensOutput> {
    const accessTokenPayload = {
      accessTokenUserId: input.userId,
    };
    const refreshTokenPayload = {
      refreshTokenUserId: input.userId,
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
