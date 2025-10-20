import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  Services,
  TasksService as TasksServiceMC,
} from '@repo/constants/services';
import {
  CreateTaskMessageInput,
  CreateTaskMessageOutput,
  DeleteTaskMessageInput,
  DeleteTaskMessageOutput,
  GetTaskMessageInput,
  GetTaskMessageOutput,
  GetTasksWithPaginationMessageInput,
  GetTasksWithPaginationMessageOutput,
  UpdateTaskMessageInput,
  UpdateTaskMessageOutput,
} from '@repo/dtos/tasks';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TasksService {
  @Inject(Services.TASKS_SERVICE)
  private tasksClient: ClientProxy;

  async getTask(input: GetTaskMessageInput): Promise<GetTaskMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.tasksClient.send(TasksServiceMC.Messages.GET_TASK, input),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async getTasksWithPagination(
    input: GetTasksWithPaginationMessageInput,
  ): Promise<GetTasksWithPaginationMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.tasksClient.send(
          TasksServiceMC.Messages.GET_TASKS_WITH_PAGINATIOn,
          input,
        ),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async createTask(
    input: CreateTaskMessageInput,
  ): Promise<CreateTaskMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.tasksClient.send(TasksServiceMC.Messages.CREATE_TASK, input),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async updateTask(
    input: UpdateTaskMessageInput,
  ): Promise<UpdateTaskMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.tasksClient.send(TasksServiceMC.Messages.UPDATE_TASK, input),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async deleteTask(
    input: DeleteTaskMessageInput,
  ): Promise<DeleteTaskMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.tasksClient.send(TasksServiceMC.Messages.DELETE_TASK, input),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
