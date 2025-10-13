import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateCommentBodyDto,
  CreateCommentParamsDto,
  GetCommentsWithPaginationQueryDto,
  GetTaskDto,
} from '@repo/shared/dtos';
import { CommentsService } from './comments.service';
import { AuthenticatedUser } from '@/auth/decorators/authenticated-user.decorator';
import { type UserType } from '@/shared/types/user';
import { AuthenticatedRoute } from '@/auth/decorators/authenticated-route.decorator';

@Controller('/tasks/:taskId/comments')
@AuthenticatedRoute()
export class CommentsController {
  @Inject()
  private commentsService: CommentsService;

  @Get('/')
  async getCommentsWithPagination(
    @Param() params: GetTaskDto,
    @Query() query: GetCommentsWithPaginationQueryDto,
  ) {
    return this.commentsService.getCommentsWithPagination({
      taskId: params.taskId,
      page: query.page,
      limitPerPage: query.limitPerPage,
    });
  }

  @Post('/')
  async createComment(
    @Param() params: CreateCommentParamsDto,
    @AuthenticatedUser() user: UserType,
    @Body() body: CreateCommentBodyDto,
  ) {
    return this.commentsService.createComment({
      authorId: user.id,
      taskId: params.taskId,
      content: body.content,
    });
  }
}
