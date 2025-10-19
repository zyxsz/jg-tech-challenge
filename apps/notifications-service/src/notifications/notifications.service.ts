import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotificationsEntity } from './entities/notifications.entity';
import { CreateNotificationDTO } from './dtos/create-notification.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationCreatedEvent } from '../events/notification-created.event';

@Injectable()
export class NotificationsService {
  @Inject('NOTIFICATIONS_REPOSITORY')
  private notificationsRepository: Repository<NotificationsEntity>;

  @Inject()
  private eventEmitter: EventEmitter2;

  async create(data: CreateNotificationDTO) {
    const notification = await this.notificationsRepository.save({
      title: data.title,
      content: data.content,
      targetId: data.targetId,
      isGlobal: data.targetId ? false : true,
    });

    this.eventEmitter.emit(
      'notification:created',
      new NotificationCreatedEvent({
        targetId: data.targetId,
        title: notification.title,
        content: notification.content,
        id: notification.id,
      }),
    );
  }
}
