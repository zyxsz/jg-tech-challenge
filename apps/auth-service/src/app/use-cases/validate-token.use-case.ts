import { UsersRepository } from '../domain/repositories/users.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { TokenProvider } from '../providers/token.provider';

export interface ValidateTokenInput {
  accessToken: string;
}

export interface ValidateTokenOutput extends UserOutput {}

export class ValidateTokenUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tokenProvider: TokenProvider,
  ) {}

  async execute(input: ValidateTokenInput): Promise<ValidateTokenOutput> {
    const tokenPayload = await this.tokenProvider.validateToken<{
      userId: string;
    }>(input.accessToken);

    if (!tokenPayload) throw new UnauthorizedError('Invalid accessToken');
    if (!tokenPayload.userId)
      throw new UnauthorizedError('Invalid accessToken payload');

    const user = await this.usersRepository.findById(tokenPayload.userId);

    return UserOutputMapper.toOutput(user);
  }
}
