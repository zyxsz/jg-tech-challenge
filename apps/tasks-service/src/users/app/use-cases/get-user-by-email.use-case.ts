import { UsersRepository } from '@/users/domain/repositories/users.repository';

export interface GetUserByEmailUseCaseInput {
  email: string;
}

export type GetUserByEmailUseCaseOutput = {
  id: string;
  username: string;
  email: string;
};

export class GetUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    input: GetUserByEmailUseCaseInput,
  ): Promise<GetUserByEmailUseCaseOutput> {
    const user = await this.usersRepository.findByEmail(
      input.email.toLowerCase(),
    );

    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}
