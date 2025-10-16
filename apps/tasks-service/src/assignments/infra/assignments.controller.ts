import { Controller, Inject } from '@nestjs/common';
import { CreateAssignmentUseCase } from '../app/use-cases/create-assignment.use-case';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetAssignmentsUseCase } from '../app/use-cases/get-assignments.use-case';
import { CreateAssignmentDTO, GetAssignmentsDTO } from '@repo/dtos';
import { TasksService } from '@repo/constants/services';

@Controller()
export class AssignmentsController {
  @Inject()
  private createAssignmentUseCase: CreateAssignmentUseCase;

  @Inject()
  private getAssignmentsUseCase: GetAssignmentsUseCase;

  @MessagePattern(TasksService.Assignments.Messages.CREATE_ASSIGNMENT)
  async createAssignment(
    @Payload() payload: CreateAssignmentDTO.Microservice.Payload,
  ) {
    return this.createAssignmentUseCase.execute(payload);
  }

  @MessagePattern(TasksService.Assignments.Messages.GET_ASSIGNMENTS)
  async getAssignments(
    @Payload() payload: GetAssignmentsDTO.Microservice.Payload,
  ) {
    return this.getAssignmentsUseCase.execute(payload);
  }
}
