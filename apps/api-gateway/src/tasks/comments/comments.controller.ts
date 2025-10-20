import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTaskCommentResponseSchema,
  GetTaskCommentsWithPaginationResponseSchema,
} from '@/docs/examples/tasks-example';
import {
  CreateCommentBodyDTO,
  CreateCommentParamsDTO,
  GetCommentsWithPaginationParamsDTO,
} from '@repo/dtos/tasks/comments';
import { GetTaskQueryParamsDTO } from '@repo/dtos/tasks';

@Controller('/tasks/:taskId/comments')
@AuthenticatedRoute()
@ApiBearerAuth()
@ApiTags('Tasks comments')
export class CommentsController {
  @Inject()
  private commentsService: CommentsService;

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Listagem de comentários com paginação',
    schema: GetTaskCommentsWithPaginationResponseSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Token de acesso invalido',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  @ApiOperation({
    summary: 'Listagem de comentários',
    description:
      'Utilize esse endpoint para listar todos os comentários de uma tarefa especifica',
  })
  async getCommentsWithPagination(
    @Param() params: GetTaskQueryParamsDTO,
    @Query() query: GetCommentsWithPaginationParamsDTO,
  ) {
    return await this.commentsService.getCommentsWithPagination({
      taskId: params.taskId,
      page: query.page,
      limitPerPage: query.limitPerPage,
    });
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 200,
    description: 'Comentário criado com sucesso',
    schema: CreateTaskCommentResponseSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Token de acesso invalido',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  @ApiOperation({
    summary: 'Criar comentários',
    description:
      'Utilize esse endpoint para criar um comentário em uma tarefa especifica',
  })
  async createComment(
    @Param() params: CreateCommentParamsDTO,
    @Body() body: CreateCommentBodyDTO,
    @AuthenticatedUser() user: UserType,
  ) {
    return await this.commentsService.createComment({
      authorId: user.id,
      taskId: params.taskId,
      content: body.content,
    });
  }
}
