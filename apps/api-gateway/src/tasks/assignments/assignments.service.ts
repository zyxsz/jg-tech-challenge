import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  Services,
  TasksService as TasksServiceMC,
} from '@repo/constants/services';
import { TasksServiceTypes } from '@repo/dtos/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AssignmentsService {
  @Inject(Services.TASKS_SERVICE)
  private tasksClient: ClientProxy;

  async createAssignment(
    input: TasksServiceTypes.Assignments.CreateAssignmentInput,
  ): Promise<TasksServiceTypes.Assignments.CreateAssignmentOutput> {
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

  async getAssignments(
    input: TasksServiceTypes.Assignments.GetAssignmentsInput,
  ): Promise<TasksServiceTypes.Assignments.GetAssignmentsOutput> {
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
