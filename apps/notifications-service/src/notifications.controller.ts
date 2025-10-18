import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsService as NotificationsServiceMC } from '@repo/constants/services';
import {
  NotificationCreateTaskCommentDTO,
  NotificationCreateTaskDTO,
  NotificationUpdateTaskStatusDTO,
} from '@repo/dtos';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  @Inject()
  private notificationsService: NotificationsService;

  @EventPattern(NotificationsServiceMC.Events.TASK_CREATED)
  async handleTaskCreated(
    @Payload() payload: NotificationCreateTaskDTO.Microservice.Payload,
  ) {
    await this.notificationsService.createTask(payload);
  }

  @EventPattern(NotificationsServiceMC.Events.TASK_STATUS_UPDATED)
  async handleTaskStatusUpdated(
    @Payload() payload: NotificationUpdateTaskStatusDTO.Microservice.Payload,
  ) {
    await this.notificationsService.updateTaskStatus(payload);
  }

  @EventPattern(NotificationsServiceMC.Events.TASK_COMMENT_CREATED)
  async handleTaskCommentCreated(
    @Payload() payload: NotificationCreateTaskCommentDTO.Microservice.Payload,
  ) {
    await this.notificationsService.taskCommentCreated(payload);
  }
}
