import { UserEntity } from '../entities/users.typeorm.entity';
import { User } from '@/users/domain/entities/user.entity';

export class UsersTypeORMMapper {
  static toEntity(entity: UserEntity) {
    return User.create(
      {
        email: entity.email,
        username: entity.username,
      },
      entity.id,
    );
  }

  static toORM(user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}
