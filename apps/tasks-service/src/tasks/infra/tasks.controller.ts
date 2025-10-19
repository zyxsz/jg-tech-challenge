import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { GetTaskUseCase } from '../app/use-cases/get-task.use-case';
import { GetTasksWithPaginationUseCase } from '../app/use-cases/get-tasks-with-pagination.use-case';
import { CreateTaskUseCase } from '../app/use-cases/create-task.use-case';
import { UpdateTaskUseCase } from '../app/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../app/use-cases/delete-task.use-case';
import {
  CreateTaskDTO,
  DeleteTaskDTO,
  GetTaskDTO,
  GetTasksWithPaginationDTO,
  UpdateTaskDTO,
} from '@repo/dtos';
import { TasksService } from '@repo/constants/services';
import { TasksServiceTypes } from '@repo/dtos/types';
import { NotificationsService } from '@/shared/services/notifications.service';
import { AuditLogsService } from '@/shared/services/audit-logs.service';
import { TaskCreatedEvent, TaskUpdatedEvent } from '@repo/dtos/types/tasks';
import { ObjectDiffProvider } from '@/shared/providers/object-diff.provider';

@Controller()
export class TasksController {
  // Services
  @Inject()
  private notificationsService: NotificationsService;

  @Inject()
  private auditLogsService: AuditLogsService;

  @Inject()
  private objectDiffProvider: ObjectDiffProvider;

  // Use cases
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
    @Payload() payload: GetTaskDTO.Microservice.Payload,
  ): Promise<TasksServiceTypes.GetTaskOutput> {
    const task = await this.getTaskUseCase.execute(payload);

    return task;
  }

  @MessagePattern(TasksService.Messages.GET_TASKS_WITH_PAGINATIOn)
  async getTasksWithPagination(
    @Payload() payload: GetTasksWithPaginationDTO.Microservice.Payload,
  ): Promise<TasksServiceTypes.GetTasksWithPaginationOutput> {
    const response = await this.getTasksWithPaginationUseCase.execute(payload);

    return response;
  }

  @MessagePattern(TasksService.Messages.CREATE_TASK)
  async createTask(
    @Payload() payload: CreateTaskDTO.Microservice.Payload,
  ): Promise<TasksServiceTypes.CreateTaskOutput> {
    const task = await this.createTaskUseCase.execute(payload);

    this.notificationsService.emitTaskCreated(new TaskCreatedEvent(task));

    return task;
  }

  @MessagePattern(TasksService.Messages.UPDATE_TASK)
  async updateTask(
    @Payload() payload: UpdateTaskDTO.Microservice.Payload,
  ): Promise<TasksServiceTypes.UpdateTaskOutput> {
    const output = await this.updateTaskUseCase.execute(payload);

    const diff = this.objectDiffProvider.detailedDiff(
      output.outdatedTask,
      output.updatedTask,
    );

    if (this.auditLogsService) {
      await this.auditLogsService.log(
        payload.taskId,
        payload.authorId,
        'UPDATE',
        diff,
      );
    }

    console.log(output);

    this.notificationsService.emitTaskUpdated(
      new TaskUpdatedEvent(output.updatedTask, output.outdatedTask),
    );

    return output.updatedTask;
  }

  @MessagePattern(TasksService.Messages.DELETE_TASK)
  async deleteTask(
    @Payload() payload: DeleteTaskDTO.Microservice.Payload,
  ): Promise<TasksServiceTypes.DeleteTaskOutput> {
    await this.deleteTaskUseCase.execute(payload);

    return { success: true };
  }
}
