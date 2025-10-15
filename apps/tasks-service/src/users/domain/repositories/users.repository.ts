import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User>;
  abstract insert(entity: User): Promise<void>;
}
