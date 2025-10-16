import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateUserUseCase } from '../app/use-cases/create-user.use-case';
import { CreateUserPayload } from '@repo/dtos';
import { TasksService } from '@repo/constants/services';

@Controller()
export class UsersController {
  @Inject()
  private createUserUseCase: CreateUserUseCase;

  @EventPattern(TasksService.Events.CREATE_USER)
  async createUser(@Payload() payload: CreateUserPayload.Microservice.Payload) {
    await this.createUserUseCase.execute(payload);
  }
}
