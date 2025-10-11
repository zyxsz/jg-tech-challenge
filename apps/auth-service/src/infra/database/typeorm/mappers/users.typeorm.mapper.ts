import { User } from '../../../../app/domain/entities/user.entity';
import { UserEntity } from '../entities/user.typeorm.entity';

export class UsersTypeORMMapper {
  static toEntity(user: UserEntity) {
    return User.create(
      {
        email: user.email,
        username: user.username,
        password: user.password,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      },
      user.id,
    );
  }

  static toORM(user: User) {
    return {
      id: user.id,
      email: user.email.toLowerCase(),
      username: user.username,
      password: user.password,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };
  }
}
