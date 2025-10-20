import { NotificationsService } from '@/app/services/notifications.service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Services, TasksService } from '@repo/constants/services';
import { UserCreatedEvent } from '@repo/dtos/auth';

@Injectable()
export class RabbitMQNotificationsService implements NotificationsService {
  @Inject(Services.TASKS_SERVICE)
  private tasksClient: ClientProxy;

  emitCreateUser(payload: UserCreatedEvent): void {
    this.tasksClient.emit(TasksService.Events.CREATE_USER, payload);
  }
}
