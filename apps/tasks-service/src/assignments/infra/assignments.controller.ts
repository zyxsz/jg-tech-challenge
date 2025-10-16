import { Controller, Inject } from '@nestjs/common';
import { CreateAssignmentUseCase } from '../app/use-cases/create-assignment.use-case';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from '@repo/microservices';
import {
  CreateAssignmentPayloadDto,
  GetAssignmentsPayloadDto,
} from '@repo/shared/dtos';
import { GetAssignmentsUseCase } from '../app/use-cases/get-assignments.use-case';

@Controller()
export class AssignmentsController {
  @Inject()
  private createAssignmentUseCase: CreateAssignmentUseCase;

  @Inject()
  private getAssignmentsUseCase: GetAssignmentsUseCase;

  @MessagePattern(TasksService.Assignments.Messages.CREATE_ASSIGNMENT)
  async createAssignment(@Payload() payload: CreateAssignmentPayloadDto) {
    return this.createAssignmentUseCase.execute(payload);
  }

  @MessagePattern(TasksService.Assignments.Messages.GET_ASSIGNMENTS)
  async getAssignments(@Payload() payload: GetAssignmentsPayloadDto) {
    return this.getAssignmentsUseCase.execute(payload);
  }
}
