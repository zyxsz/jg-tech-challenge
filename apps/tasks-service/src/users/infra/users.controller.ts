import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateUserUseCase } from '../app/use-cases/create-user.use-case';
import { UserCreatedEvent } from '@repo/dtos/auth';
import { TasksService } from '@repo/constants/services';

@Controller()
export class UsersController {
  @Inject()
  private createUserUseCase: CreateUserUseCase;

  @EventPattern(TasksService.Events.CREATE_USER)
  async createUser(@Payload() payload: UserCreatedEvent) {
    await this.createUserUseCase.execute({
      email: payload.user.email,
      id: payload.user.id,
      username: payload.user.username,
    });
  }
}
