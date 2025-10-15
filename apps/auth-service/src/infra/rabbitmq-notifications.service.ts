import { NotificationsService } from '@/app/services/notifications.service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthServiceTypes, Services, TasksService } from '@repo/microservices';

@Injectable()
export class RabbitMQNotificationsService implements NotificationsService {
  @Inject(Services.TASKS_SERVICE)
  private tasksClient: ClientProxy;

  async emitCreateUser(
    payload: AuthServiceTypes.CreateUserEventPayload,
  ): Promise<void> {
    this.tasksClient.emit(TasksService.Events.CREATE_USER, payload);
  }
}
