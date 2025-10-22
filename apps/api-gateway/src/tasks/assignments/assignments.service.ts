import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  Services,
  TasksService as TasksServiceMC,
} from '@repo/constants/services';
import {
  CreateAssignmentByEmailMessageInput,
  CreateAssignmentByEmailMessageOutput,
  CreateAssignmentMessageInput,
  CreateAssignmentMessageOutput,
  GetAssignmentsMessageInput,
  GetAssignmentsMessageOutput,
} from '@repo/dtos/tasks/assignments';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AssignmentsService {
  @Inject(Services.TASKS_SERVICE)
  private tasksClient: ClientProxy;

  async createAssignment(
    input: CreateAssignmentMessageInput,
  ): Promise<CreateAssignmentMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.tasksClient.send(
          TasksServiceMC.Assignments.Messages.CREATE_ASSIGNMENT,
          input,
        ),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async createAssignmentByEmail(
    input: CreateAssignmentByEmailMessageInput,
  ): Promise<CreateAssignmentByEmailMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.tasksClient.send(
          TasksServiceMC.Assignments.Messages.CREATE_ASSIGNMENT_BY_EMAIL,
          input,
        ),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async getAssignments(
    input: GetAssignmentsMessageInput,
  ): Promise<GetAssignmentsMessageOutput> {
    try {
      const response = await firstValueFrom(
        this.tasksClient.send(
          TasksServiceMC.Assignments.Messages.GET_ASSIGNMENTS,
          input,
        ),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
