import { UserEntity } from "../entities/user.entity";

export class UserCreatedEvent {
  user: UserEntity;
}
