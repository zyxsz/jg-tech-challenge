import { Controller, Inject, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  TaskCommentCreatedEvent,
  TaskCreatedEvent,
  TaskUpdatedEvent,
} from '@repo/dtos/tasks';
import { NotificationsService } from './notifications.service';
import { TasksService } from '@repo/constants/services';

@Controller()
export class NotificationsController {
  private readonly logger = new Logger('NotificationsController');

  @Inject()
  private notificationsService: NotificationsService;

  @EventPattern(TasksService.Events.TASK_CREATED)
  async handleTaskCreated(@Payload() payload: TaskCreatedEvent) {
    this.logger.log(`Task createde event received: ${JSON.stringify(payload)}`);

    await this.notificationsService.create({
      title: 'Nova tarefa na área!',
      content: `A tarefa **${payload.task.title}** foi criada`,
    });
  }

  @EventPattern(TasksService.Events.TASK_ASSIGNMENT_CREATED)
  async handleTaskAssignmentCreated(@Payload() payload: TaskCreatedEvent) {
    this.logger.log(
      `Task assignment created event received: ${JSON.stringify(payload)}`,
    );

    await this.notificationsService.create({
      title: 'Mão na obra!',
      content: `A tarefa **${payload.task.title}** foi associada a você`,
    });
  }

  @EventPattern(TasksService.Events.TASK_UPDATED)
  async handleTaskUpdated(@Payload() payload: TaskUpdatedEvent) {
    this.logger.log(`Task updated event received: ${JSON.stringify(payload)}`);

    if (payload.outdatedTask.status === payload.updatedTask.status) return;

    await this.notificationsService.create({
      title: 'Tarefa atualizada!',
      content: `O status da tarefa **${payload.updatedTask.title}** foi atualizado`,
    });
  }

  @EventPattern(TasksService.Events.TASK_COMMENT_CREATED)
  async handleTaskCommentCreated(@Payload() payload: TaskCommentCreatedEvent) {
    this.logger.log(
      `Task comment created event received: ${JSON.stringify(payload)}`,
    );

    await this.notificationsService.create({
      title: 'Novo comentário!',
      content: `A tarefa **${payload.task.title}** recebeu um novo comentário`,
    });
  }
}
