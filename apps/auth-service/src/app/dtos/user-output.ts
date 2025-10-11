import { User } from '../domain/entities/user.entity';

export interface UserOutput {
  id: string;
  username: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
}

export class UserOutputMapper {
  static toOutput(entity: User) {
    return {
      id: entity.id,
      username: entity.username,
      email: entity.email,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    } satisfies UserOutput;
  }
}
