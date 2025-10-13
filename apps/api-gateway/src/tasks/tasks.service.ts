import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  Services,
  TasksServiceTypes,
  TasksService as TasksServiceMC,
} from '@repo/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TasksService {
  @Inject(Services.TASKS_SERVICE)
  private tasksClient: ClientProxy;

  async getTask(
    input: TasksServiceTypes.GetTaskInput,
  ): Promise<TasksServiceTypes.GetTaskOutput> {
    try {
      return await lastValueFrom(
        this.tasksClient.send(TasksServiceMC.Messages.GET_TASK, input),
      );
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async getTasksWithPagination(
    input: TasksServiceTypes.GetTasksWithPaginationInput,
  ): Promise<TasksServiceTypes.GetTasksWithPaginationOutput> {
    try {
      return await lastValueFrom(
        this.tasksClient.send(
          TasksServiceMC.Messages.GET_TASKS_WITH_PAGINATIOn,
          input,
        ),
      );
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async createTask(
    input: TasksServiceTypes.CreateTaskInput,
  ): Promise<TasksServiceTypes.CreateTaskOutput> {
    try {
      return await lastValueFrom(
        this.tasksClient.send(TasksServiceMC.Messages.CREATE_TASK, input),
      );
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async updateTask(
    input: TasksServiceTypes.UpdateTaskInput,
  ): Promise<TasksServiceTypes.UpdateTaskOutput> {
    try {
      return await lastValueFrom(
        this.tasksClient.send(TasksServiceMC.Messages.UPDATE_TASK, input),
      );
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async deleteTask(
    input: TasksServiceTypes.DeleteTaskInput,
  ): Promise<TasksServiceTypes.DeleteTaskOutput> {
    try {
      return await lastValueFrom(
        this.tasksClient.send(TasksServiceMC.Messages.DELETE_TASK, input),
      );
    } catch (err) {
      console.log(err);

      throw err;
    }
  }
}
