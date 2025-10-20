import { NotificationsService } from '@/shared/services/notifications.service';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Services, TasksService } from '@repo/constants/services';
import {
  TaskAssignmentCreatedEvent,
  TaskCommentCreatedEvent,
  TaskCreatedEvent,
  TaskUpdatedEvent,
} from '@repo/dtos/tasks';

export class RabbitMQNotificationsService implements NotificationsService {
  @Inject(Services.NOTIFICATIONS_SERVICE)
  private notificationsClient: ClientProxy;

  emitTaskCreated(event: TaskCreatedEvent): void {
    this.notificationsClient.emit(TasksService.Events.TASK_CREATED, event);
  }

  emitTaskAssignmentCreated(event: TaskAssignmentCreatedEvent): void {
    this.notificationsClient.emit(
      TasksService.Events.TASK_ASSIGNMENT_CREATED,
      event,
    );
  }

  emitTaskUpdated(event: TaskUpdatedEvent): void {
    this.notificationsClient.emit(TasksService.Events.TASK_UPDATED, event);
  }

  emitTaskCommentCreated(event: TaskCommentCreatedEvent): void {
    this.notificationsClient.emit(
      TasksService.Events.TASK_COMMENT_CREATED,
      event,
    );
  }
}
