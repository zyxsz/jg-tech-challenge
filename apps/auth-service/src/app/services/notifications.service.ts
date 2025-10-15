import { AuthServiceTypes } from '@repo/microservices';

export abstract class NotificationsService {
  abstract emitCreateUser(
    payload: AuthServiceTypes.CreateUserEventPayload,
  ): Promise<void>;
}
