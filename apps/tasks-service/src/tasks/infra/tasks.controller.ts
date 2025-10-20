import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { GetTaskUseCase } from '../app/use-cases/get-task.use-case';
import { GetTasksWithPaginationUseCase } from '../app/use-cases/get-tasks-with-pagination.use-case';
import { CreateTaskUseCase } from '../app/use-cases/create-task.use-case';
import { UpdateTaskUseCase } from '../app/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../app/use-cases/delete-task.use-case';
import { TasksService } from '@repo/constants/services';
import { NotificationsService } from '@/shared/services/notifications.service';
import { AuditLogsService } from '@/shared/services/audit-logs.service';
import { TaskCreatedEvent, TaskUpdatedEvent } from '@repo/dtos/tasks';
import { ObjectDiffProvider } from '@/shared/providers/object-diff.provider';
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
    @Payload() payload: GetTaskMessageInput,
  ): Promise<GetTaskMessageOutput> {
    const task = await this.getTaskUseCase.execute({ taskId: payload.taskId });

    return { task };
  }

  @MessagePattern(TasksService.Messages.GET_TASKS_WITH_PAGINATIOn)
  async getTasksWithPagination(
    @Payload() payload: GetTasksWithPaginationMessageInput,
  ): Promise<GetTasksWithPaginationMessageOutput> {
    const response = await this.getTasksWithPaginationUseCase.execute(payload);

    return response;
  }

  @MessagePattern(TasksService.Messages.CREATE_TASK)
  async createTask(
    @Payload() payload: CreateTaskMessageInput,
  ): Promise<CreateTaskMessageOutput> {
    const task = await this.createTaskUseCase.execute(payload);

    this.notificationsService.emitTaskCreated(new TaskCreatedEvent(task));

    return { task };
  }

  @MessagePattern(TasksService.Messages.UPDATE_TASK)
  async updateTask(
    @Payload() payload: UpdateTaskMessageInput,
  ): Promise<UpdateTaskMessageOutput> {
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

    this.notificationsService.emitTaskUpdated(
      new TaskUpdatedEvent(output.updatedTask, output.outdatedTask),
    );

    return {
      task: output.updatedTask,
    };
  }

  @MessagePattern(TasksService.Messages.DELETE_TASK)
  async deleteTask(
    @Payload() payload: DeleteTaskMessageInput,
  ): Promise<DeleteTaskMessageOutput> {
    await this.deleteTaskUseCase.execute({ taskId: payload.taskId });

    return { success: true };
  }
}
