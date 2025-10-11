import { UsersRepository } from '../domain/repositories/users.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { HashProvider } from '../providers/hash.provider';

export interface LoginUseCaseInput {
  email: string;
  password: string;
}

export interface LoginUseCaseOutput extends UserOutput {}

export class LoginUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
  ) {}

  async execute(input: LoginUseCaseInput): Promise<LoginUseCaseOutput> {
    const user = await this.usersRepository.findByEmail(input.email);

    const isPasswordValid = await this.hashProvider.compare(
      input.password,
      user.password,
    );

    if (!isPasswordValid) throw new InvalidCredentialsError();

    return UserOutputMapper.toOutput(user);
  }
}
