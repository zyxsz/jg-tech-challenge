import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  Services,
  TasksService as TasksServiceMC,
} from '@repo/constants/services';
import { TasksServiceTypes } from '@repo/dtos/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TasksService {
  @Inject(Services.TASKS_SERVICE)
  private tasksClient: ClientProxy;

  async getTask(
    input: TasksServiceTypes.GetTaskInput,
  ): Promise<TasksServiceTypes.GetTaskOutput> {
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
    input: TasksServiceTypes.GetTasksWithPaginationInput,
  ): Promise<TasksServiceTypes.GetTasksWithPaginationOutput> {
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
    input: TasksServiceTypes.CreateTaskInput,
  ): Promise<TasksServiceTypes.CreateTaskOutput> {
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
    input: TasksServiceTypes.UpdateTaskInput,
  ): Promise<TasksServiceTypes.UpdateTaskOutput> {
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
    input: TasksServiceTypes.DeleteTaskInput,
  ): Promise<TasksServiceTypes.DeleteTaskOutput> {
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
