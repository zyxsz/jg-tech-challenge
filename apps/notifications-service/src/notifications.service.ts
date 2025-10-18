import { Inject, Injectable } from '@nestjs/common';
import { NotificationsServiceTypes } from '@repo/dtos/types';
import { NotificationsRepository } from './repositories/notifications.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationCreatedEventDTO } from './events/dtos/notification-created-event.dto';

@Injectable()
export class NotificationsService {
  @Inject()
  private notificationsRepository: NotificationsRepository;

  @Inject()
  private eventEmitter: EventEmitter2;

  async createTask(
    input: NotificationsServiceTypes.CreateTaskInput,
  ): Promise<NotificationsServiceTypes.CreateTaskOutput> {
    const notification = await this.notificationsRepository.create({
      title: 'Uma nova tarefa foi criada!',
      content: `A tarefa **${input.title}** acabou de ser criada.`,
    });

    this.eventEmitter.emit(
      'notification:created',
      new NotificationCreatedEventDTO({
        title: notification.title,
        content: notification.content,
      }),
    );
  }

  async updateTaskStatus(
    input: NotificationsServiceTypes.UpdateTaskStatusInput,
  ): Promise<NotificationsServiceTypes.UpdateTaskStatusOutput> {
    const notification = await this.notificationsRepository.create({
      title: 'Tarefa atualizada!',
      content: `O status da tarefa **${input.title}** foi atualizado para **${input.status}**`,
    });

    this.eventEmitter.emit(
      'notification:created',
      new NotificationCreatedEventDTO({
        title: notification.title,
        content: notification.content,
      }),
    );
  }

  async taskCommentCreated(
    input: NotificationsServiceTypes.TaskCommentCreatedInput,
  ): Promise<NotificationsServiceTypes.TaskCommentCreatedOutput> {
    const notification = await this.notificationsRepository.create({
      title: 'Novo comentário!',
      content: `Foi feito um novo comentário em uma de suas tarefas.`,
    });

    this.eventEmitter.emit(
      'notification:created',
      new NotificationCreatedEventDTO({
        title: notification.title,
        content: notification.content,
        targetId: `users:${input.taskAuthorId}`,
      }),
    );
  }
}
