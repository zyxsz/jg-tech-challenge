import { User } from '@/users/domain/entities/user.entity';
import { UsersRepository } from '@/users/domain/repositories/users.repository';

export interface CreateUserUseCaseInput {
  id: string;
  email: string;
  username: string;
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(input: CreateUserUseCaseInput) {
    const user = User.create(
      {
        email: input.email,
        username: input.username,
      },
      input.id,
    );

    await this.usersRepository.insert(user);
  }
}
