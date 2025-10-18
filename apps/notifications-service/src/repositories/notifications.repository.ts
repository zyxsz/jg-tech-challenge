import { NotificationsEntity } from '@/entities/notifications.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsRepository {
  constructor(
    @Inject('NOTIFICATIONS_REPOSITORY')
    private notificationsRepository: Repository<NotificationsEntity>,
  ) {}

  async create(data: { title: string; content: string }) {
    const notification = await this.notificationsRepository.save({
      title: data.title,
      content: data.content,
    });

    return notification;
  }
}
