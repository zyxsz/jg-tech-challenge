import { NotificationsService } from '@/shared/services/notifications.service';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Services } from '@repo/constants/services';
import { NotificationsServiceTypes } from '@repo/dtos/types';
import { NotificationsService as NotificationsServiceMC } from '@repo/constants/services';

export class RabbitMQNotificationsService implements NotificationsService {
  @Inject(Services.NOTIFICATIONS_SERVICE)
  private notificationsClient: ClientProxy;

  async sendCreateTask(
    input: NotificationsServiceTypes.CreateTaskInput,
  ): Promise<NotificationsServiceTypes.CreateTaskOutput> {
    this.notificationsClient.emit(
      NotificationsServiceMC.Events.TASK_CREATED,
      input,
    );
  }

  async sendTaskCommentCreated(
    input: NotificationsServiceTypes.TaskCommentCreatedInput,
  ): Promise<NotificationsServiceTypes.TaskCommentCreatedOutput> {
    this.notificationsClient.emit(
      NotificationsServiceMC.Events.TASK_COMMENT_CREATED,
      input,
    );
  }

  async sendTaskStatusUpdated(
    input: NotificationsServiceTypes.UpdateTaskStatusInput,
  ): Promise<NotificationsServiceTypes.UpdateTaskStatusOutput> {
    this.notificationsClient.emit(
      NotificationsServiceMC.Events.TASK_STATUS_UPDATED,
      input,
    );
  }
}
