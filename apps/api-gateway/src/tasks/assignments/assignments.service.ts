import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  Services,
  TasksServiceTypes,
  TasksService as TasksServiceMC,
} from '@repo/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AssignmentsService {
  @Inject(Services.TASKS_SERVICE)
  private tasksClient: ClientProxy;

  async createAssignment(
    input: TasksServiceTypes.Assignments.CreateAssignmentInput,
  ): Promise<TasksServiceTypes.Assignments.CreateAssignmentOutput> {
    try {
      return await lastValueFrom(
        this.tasksClient.send(
          TasksServiceMC.Assignments.Messages.CREATE_ASSIGNMENT,
          input,
        ),
      );
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async getAssignments(
    input: TasksServiceTypes.Assignments.GetAssignmentsInput,
  ): Promise<TasksServiceTypes.Assignments.GetAssignmentsOutput> {
    try {
      return await lastValueFrom(
        this.tasksClient.send(
          TasksServiceMC.Assignments.Messages.GET_ASSIGNMENTS,
          input,
        ),
      );
    } catch (err) {
      console.log(err);

      throw err;
    }
  }
}
