import { User } from '../domain/entities/user.entity';
import { UsersRepository } from '../domain/repositories/users.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { ConflictError } from '../errors/conflict.error';
import { HashProvider } from '../providers/hash.provider';

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export interface RegisterUserOutput extends UserOutput {}

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const userAlreadyExists = await this.usersRepository
      .findByEmail(input.email)
      .catch(() => null);

    if (userAlreadyExists !== null)
      throw new ConflictError('User already exists');

    const passwordHash = await this.hashProvider.hash(input.password);

    const user = User.create({
      username: input.username,
      email: input.email,
      password: passwordHash,
    });

    await this.usersRepository.insert(user);

    return UserOutputMapper.toOutput(user);
  }
}
