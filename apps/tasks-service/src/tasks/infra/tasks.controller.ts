import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService, TasksServiceTypes } from '@repo/microservices';
import {
  CreateTaskDto,
  DeleteTaskDto,
  GetTaskDto,
  GetTasksWithPaginationDto,
  UpdateTaskDto,
} from '@repo/shared/dtos';
import { GetTaskUseCase } from '../app/use-cases/get-task.use-case';
import { GetTasksWithPaginationUseCase } from '../app/use-cases/get-tasks-with-pagination.use-case';
import { CreateTaskUseCase } from '../app/use-cases/create-task.use-case';
import { UpdateTaskUseCase } from '../app/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../app/use-cases/delete-task.use-case';

@Controller()
export class TasksController {
  @Inject()
  private getTaskUseCase: GetTaskUseCase;
  @Inject()
  private getTasksWithPaginationUseCase: GetTasksWithPaginationUseCase;
  @Inject()
  private createTaskUseCase: CreateTaskUseCase;
  @Inject()
  private updateTaskUseCase: UpdateTaskUseCase;
  @Inject()
  private deleteTaskUseCase: DeleteTaskUseCase;

  @MessagePattern(TasksService.Messages.GET_TASK)
  async getTask(
    @Payload() payload: GetTaskDto,
  ): Promise<TasksServiceTypes.GetTaskOutput> {
    const task = await this.getTaskUseCase.execute(payload);

    return task;
  }

  @MessagePattern(TasksService.Messages.GET_TASKS_WITH_PAGINATIOn)
  async getTasksWithPagination(
    @Payload() payload: GetTasksWithPaginationDto,
  ): Promise<TasksServiceTypes.GetTasksWithPaginationOutput> {
    const response = await this.getTasksWithPaginationUseCase.execute(payload);

    return response;
  }

  @MessagePattern(TasksService.Messages.CREATE_TASK)
  async createTask(
    @Payload() payload: CreateTaskDto,
  ): Promise<TasksServiceTypes.CreateTaskOutput> {
    const task = await this.createTaskUseCase.execute(payload);

    return task;
  }

  @MessagePattern(TasksService.Messages.UPDATE_TASK)
  async updateTask(
    @Payload() payload: UpdateTaskDto,
  ): Promise<TasksServiceTypes.UpdateTaskOutput> {
    const task = await this.updateTaskUseCase.execute(payload);

    return task;
  }

  @MessagePattern(TasksService.Messages.DELETE_TASK)
  async deleteTask(
    @Payload() payload: DeleteTaskDto,
  ): Promise<TasksServiceTypes.DeleteTaskOutput> {
    const response = await this.deleteTaskUseCase.execute(payload);

    return response;
  }
}
