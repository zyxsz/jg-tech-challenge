import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  Services,
  TasksService as TasksServiceMC,
} from '@repo/constants/services';
import { TasksServiceTypes } from '@repo/dtos/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommentsService {
  @Inject(Services.TASKS_SERVICE)
  private tasksClient: ClientProxy;

  async createComment(
    input: TasksServiceTypes.Comments.CreateCommentInput,
  ): Promise<TasksServiceTypes.Comments.CreateCommentOutput> {
    try {
      const response = await firstValueFrom(
        this.tasksClient.send(
          TasksServiceMC.Comments.Messages.CREATE_COMMENT,
          input,
        ),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async getCommentsWithPagination(
    input: TasksServiceTypes.Comments.GetCommentWithPaginationInput,
  ): Promise<TasksServiceTypes.Comments.GetCommentWithPaginationOutput> {
    try {
      const response = await firstValueFrom(
        this.tasksClient.send(
          TasksServiceMC.Comments.Messages.GET_COMMENTS_WITH_PAGINATION,
          input,
        ),
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
