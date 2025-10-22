import { Controller, Inject } from '@nestjs/common';
import { CreateAssignmentUseCase } from '../app/use-cases/create-assignment.use-case';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetAssignmentsUseCase } from '../app/use-cases/get-assignments.use-case';
import { TasksService } from '@repo/constants/services';
import { NotificationsService } from '@/shared/services/notifications.service';
import { GetTaskUseCase } from '@/tasks/app/use-cases/get-task.use-case';
import {
  CreateAssignmentByEmailMessageInput,
  CreateAssignmentByEmailMessageOutput,
  CreateAssignmentMessageInput,
  CreateAssignmentMessageOutput,
  GetAssignmentsMessageInput,
  GetAssignmentsMessageOutput,
} from '@repo/dtos/tasks/assignments';
import { GetUserByEmailUseCase } from '@/users/app/use-cases/get-user-by-email.use-case';

@Controller()
export class AssignmentsController {
  // Services

  @Inject()
  private notificationService: NotificationsService;

  // Assignments

  @Inject()
  private createAssignmentUseCase: CreateAssignmentUseCase;

  @Inject()
  private getAssignmentsUseCase: GetAssignmentsUseCase;

  // Tasks

  @Inject()
  private getTaskUseCase: GetTaskUseCase;

  // Users

  @Inject()
  private getUserByEmailUseCase: GetUserByEmailUseCase;

  @MessagePattern(TasksService.Assignments.Messages.GET_ASSIGNMENTS)
  async getAssignments(
    @Payload() payload: GetAssignmentsMessageInput,
  ): Promise<GetAssignmentsMessageOutput> {
    const response = await this.getAssignmentsUseCase.execute({
      taskId: payload.taskId,
    });

    return { assignments: response };
  }

  @MessagePattern(TasksService.Assignments.Messages.CREATE_ASSIGNMENT)
  async createAssignment(
    @Payload() payload: CreateAssignmentMessageInput,
  ): Promise<CreateAssignmentMessageOutput> {
    const task = await this.getTaskUseCase.execute({ taskId: payload.taskId });
    const assignment = await this.createAssignmentUseCase.execute({
      taskId: payload.taskId,
      userId: payload.userId,
    });

    this.notificationService.emitTaskAssignmentCreated({
      targetId: payload.userId,
      task,
    });

    return { assignment: assignment };
  }

  @MessagePattern(TasksService.Assignments.Messages.CREATE_ASSIGNMENT_BY_EMAIL)
  async createAssignmentByEmail(
    @Payload() payload: CreateAssignmentByEmailMessageInput,
  ): Promise<CreateAssignmentByEmailMessageOutput> {
    const user = await this.getUserByEmailUseCase.execute({
      email: payload.userEmail,
    });
    const task = await this.getTaskUseCase.execute({ taskId: payload.taskId });

    const assignment = await this.createAssignmentUseCase.execute({
      taskId: payload.taskId,
      userId: user.id,
    });

    this.notificationService.emitTaskAssignmentCreated({
      targetId: user.id,
      task,
    });

    return { assignment: assignment };
  }
}
