import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TasksService } from '@repo/microservices';
import { CreateUserPayloadDto } from '@repo/shared/dtos';
import { CreateUserUseCase } from '../app/use-cases/create-user.use-case';

@Controller()
export class UsersController {
  @Inject()
  private createUserUseCase: CreateUserUseCase;

  @EventPattern(TasksService.Events.CREATE_USER)
  async createUser(@Payload() payload: CreateUserPayloadDto) {
    await this.createUserUseCase.execute(payload);
  }
}
