import { AuthServiceTypes } from '@repo/dtos/types';

export abstract class NotificationsService {
  abstract emitCreateUser(
    payload: AuthServiceTypes.CreateUserEventPayload,
  ): Promise<void>;
}
