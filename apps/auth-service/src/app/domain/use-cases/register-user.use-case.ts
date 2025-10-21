import { UserOutput, UserOutputMapper } from '@/app/dtos/user-output';
import { ConflictError } from '@repo/errors/exceptions';
import { UsersRepository } from '../repositories/users.repository';
import { HashProvider } from '@/app/domain/providers/hash.provider';
import { User } from '../entities/user.entity';

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export type RegisterUserOutput = UserOutput;

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
      throw new ConflictError('Não foi possível criar o usuário');

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
