import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  Services,
  TasksServiceTypes,
  TasksService as TasksServiceMC,
} from '@repo/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CommentsService {
  @Inject(Services.TASKS_SERVICE)
  private tasksClient: ClientProxy;

  async createComment(
    input: TasksServiceTypes.Comments.CreateCommentInput,
  ): Promise<TasksServiceTypes.Comments.CreateCommentOutput> {
    try {
      return await lastValueFrom(
        this.tasksClient.send(
          TasksServiceMC.Comments.Messages.CREATE_COMMENT,
          input,
        ),
      );
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async getCommentsWithPagination(
    input: TasksServiceTypes.Comments.GetCommentWithPaginationInput,
  ): Promise<TasksServiceTypes.Comments.GetCommentWithPaginationOutput> {
    try {
      return await lastValueFrom(
        this.tasksClient.send(
          TasksServiceMC.Comments.Messages.GET_COMMENTS_WITH_PAGINATION,
          input,
        ),
      );
    } catch (err) {
      console.log(err);

      throw err;
    }
  }
}
