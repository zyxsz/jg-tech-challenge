import { Controller, Inject } from '@nestjs/common';
import { CreateAssignmentUseCase } from '../app/use-cases/create-assignment.use-case';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetAssignmentsUseCase } from '../app/use-cases/get-assignments.use-case';
import { CreateAssignmentDTO, GetAssignmentsDTO } from '@repo/dtos';
import { TasksService } from '@repo/constants/services';
import { NotificationsService } from '@/shared/services/notifications.service';
import { GetTaskUseCase } from '@/tasks/app/use-cases/get-task.use-case';

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

  @MessagePattern(TasksService.Assignments.Messages.CREATE_ASSIGNMENT)
  async createAssignment(
    @Payload() payload: CreateAssignmentDTO.Microservice.Payload,
  ) {
    const task = await this.getTaskUseCase.execute({ taskId: payload.taskId });
    const assignment = await this.createAssignmentUseCase.execute(payload);

    this.notificationService.emitTaskAssignmentCreated({
      targetId: payload.userId,
      task,
    });

    return assignment;
  }

  @MessagePattern(TasksService.Assignments.Messages.GET_ASSIGNMENTS)
  async getAssignments(
    @Payload() payload: GetAssignmentsDTO.Microservice.Payload,
  ) {
    return this.getAssignmentsUseCase.execute(payload);
  }
}
