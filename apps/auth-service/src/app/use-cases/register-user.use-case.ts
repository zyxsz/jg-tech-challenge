import { ConflictError } from '@repo/errors/exceptions';
import { User } from '../domain/entities/user.entity';
import { UsersRepository } from '../domain/repositories/users.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { HashProvider } from '../providers/hash.provider';
import { NotificationsService } from '../services/notifications.service';

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
    private notificationsService: NotificationsService,
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

    if (this.notificationsService) {
      await this.notificationsService.emitCreateUser({
        id: user.id,
        email: user.email,
        username: user.username,
      });
    }

    return UserOutputMapper.toOutput(user);
  }
}
