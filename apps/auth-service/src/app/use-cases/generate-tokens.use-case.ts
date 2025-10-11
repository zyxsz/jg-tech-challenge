import { addDays, addMinutes } from 'date-fns';
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
      userId: input.userId,
    };
    const refreshTokenPayload = {
      userId: input.userId,
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
