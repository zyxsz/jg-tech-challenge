import { UserOutput, UserOutputMapper } from '@/app/dtos/user-output';
import { UnauthorizedError } from '@repo/errors/exceptions';
import { UsersRepository } from '../repositories/users.repository';
import { TokenProvider } from '../providers/token.provider';

export interface ValidateTokenInput {
  accessToken: string;
}

export type ValidateTokenOutput = UserOutput;

export class ValidateTokenUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tokenProvider: TokenProvider,
  ) {}

  async execute(input: ValidateTokenInput): Promise<ValidateTokenOutput> {
    const tokenPayload = await this.tokenProvider.validateToken<{
      accessTokenUserId: string;
    }>(input.accessToken);

    if (!tokenPayload) throw new UnauthorizedError('Invalid accessToken');
    if (!tokenPayload.accessTokenUserId)
      throw new UnauthorizedError('Invalid accessToken payload');

    const user = await this.usersRepository.findById(
      tokenPayload.accessTokenUserId,
    );

    return UserOutputMapper.toOutput(user);
  }
}
