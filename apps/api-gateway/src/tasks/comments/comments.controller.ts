import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthenticatedUser } from '@/auth/decorators/authenticated-user.decorator';
import { type UserType } from '@/shared/types/user';
import { AuthenticatedRoute } from '@/auth/decorators/authenticated-route.decorator';
import {
  CreateCommentDTO,
  GetCommentsWithPaginationDTO,
  GetTaskDTO,
} from '@repo/dtos';

@Controller('/tasks/:taskId/comments')
@AuthenticatedRoute()
export class CommentsController {
  @Inject()
  private commentsService: CommentsService;

  @Get('/')
  async getCommentsWithPagination(
    @Param() params: GetTaskDTO.Http.Params,
    @Query() query: GetCommentsWithPaginationDTO.Http.Params,
  ) {
    return this.commentsService.getCommentsWithPagination({
      taskId: params.taskId,
      page: query.page,
      limitPerPage: query.limitPerPage,
    });
  }

  @Post('/')
  async createComment(
    @Param() params: CreateCommentDTO.Http.Params,
    @Body() body: CreateCommentDTO.Http.Body,
    @AuthenticatedUser() user: UserType,
  ) {
    return this.commentsService.createComment({
      authorId: user.id,
      taskId: params.taskId,
      content: body.content,
    });
  }
}
