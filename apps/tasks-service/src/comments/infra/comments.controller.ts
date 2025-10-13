import { Controller, Inject } from '@nestjs/common';
import { GetCommentsWithPaginationUseCase } from '../app/use-cases/get-comments-with-pagination.use-case';
import { CreateCommentUseCase } from '../app/use-cases/create-comment.use-case';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from '@repo/microservices';
import {
  CreateCommentDto,
  GetCommentsWithPaginationDto,
} from '@repo/shared/dtos';

@Controller()
export class CommentsController {
  @Inject()
  private getCommentsWithPaginationUseCase: GetCommentsWithPaginationUseCase;

  @Inject()
  private createCommentUseCase: CreateCommentUseCase;

  @MessagePattern(TasksService.Comments.Messages.CREATE_COMMENT)
  async createComment(@Payload() payload: CreateCommentDto) {
    return this.createCommentUseCase.execute(payload);
  }

  @MessagePattern(TasksService.Comments.Messages.GET_COMMENTS_WITH_PAGINATION)
  async getCommentsWithPagination(
    @Payload() payload: GetCommentsWithPaginationDto,
  ) {
    return this.getCommentsWithPaginationUseCase.execute(payload);
  }
}
