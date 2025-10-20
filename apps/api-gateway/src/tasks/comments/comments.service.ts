import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  Services,
  TasksService as TasksServiceMC,
} from '@repo/constants/services';
import { firstValueFrom } from 'rxjs';
import {
  CreateCommentMessageInput,
  CreateCommentMessageOutput,
  GetCommentsWithPaginationMessageInput,
  GetCommentsWithPaginationMessageOutput,
} from '@repo/dtos/tasks/comments';

@Injectable()
export class CommentsService {
  @Inject(Services.TASKS_SERVICE)
  private tasksClient: ClientProxy;

  async createComment(
    input: CreateCommentMessageInput,
  ): Promise<CreateCommentMessageOutput> {
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
    input: GetCommentsWithPaginationMessageInput,
  ): Promise<GetCommentsWithPaginationMessageOutput> {
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
