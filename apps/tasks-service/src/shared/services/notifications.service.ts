import { NotificationsServiceTypes } from '@repo/dtos/types';

export abstract class NotificationsService {
  abstract sendCreateTask(
    input: NotificationsServiceTypes.CreateTaskInput,
  ): Promise<NotificationsServiceTypes.CreateTaskOutput>;

  abstract sendTaskCommentCreated(
    input: NotificationsServiceTypes.TaskCommentCreatedInput,
  ): Promise<NotificationsServiceTypes.TaskCommentCreatedOutput>;

  abstract sendTaskStatusUpdated(
    input: NotificationsServiceTypes.UpdateTaskStatusInput,
  ): Promise<NotificationsServiceTypes.UpdateTaskStatusOutput>;
}
