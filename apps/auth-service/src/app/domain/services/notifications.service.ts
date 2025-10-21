import { UserCreatedEvent } from '@repo/dtos/auth';

export abstract class NotificationsService {
  abstract emitCreateUser(payload: UserCreatedEvent): void;
}
