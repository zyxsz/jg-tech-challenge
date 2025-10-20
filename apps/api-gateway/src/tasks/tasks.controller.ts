import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { AuthenticatedRoute } from '@/auth/decorators/authenticated-route.decorator';
import { AuthenticatedUser } from '@/auth/decorators/authenticated-user.decorator';
import type { UserType } from '@/shared/types/user';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  GetTaskResponseSchema,
  GetTasksWithPaginationResponseSchema,
} from '@/docs/examples/tasks-example';
import {
  CreateTaskBodyDTO,
  DeleteTaskParamsDTO,
  GetTaskQueryParamsDTO,
  GetTasksWithPaginationQueryDTO,
  UpdateTaskBodyDTO,
  UpdateTaskParamsDTO,
} from '@repo/dtos/tasks';

@Controller('/tasks')
@AuthenticatedRoute()
@ApiBearerAuth()
@ApiTags('Tasks')
export class TasksController {
  @Inject()
  private tasksService: TasksService;

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Retorna todas as tarefas com paginação',
    schema: GetTasksWithPaginationResponseSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Token de acesso invalido',
  })
  @ApiOperation({
    summary: 'Listagem de tarefas',
    description:
      'Utilize esse endpoint para a listagem de tarefas com paginação',
  })
  async getTasksWithPagination(@Query() query: GetTasksWithPaginationQueryDTO) {
    const response = await this.tasksService.getTasksWithPagination(query);

    return {
      data: response.data,
      pagination: response.pagination,
    };
  }

  @Get('/:taskId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Retorna todos os detalhes de uma tarefa especifica',
    schema: GetTaskResponseSchema,
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
    summary: 'Buscar tarefa',
    description: 'Utilize esse endpoint para buscar uma tarefa especifica',
  })
  async getTask(@Param() params: GetTaskQueryParamsDTO) {
    const response = await this.tasksService.getTask(params);

    return response.task;
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso',
    schema: GetTaskResponseSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Token de acesso invalido',
  })
  @ApiOperation({
    summary: 'Criar tarefa',
    description: 'Utilize esse endpoint para criar uma nova tarefa',
  })
  async createTask(
    @AuthenticatedUser() user: UserType,
    @Body() body: CreateTaskBodyDTO,
  ) {
    const response = await this.tasksService.createTask({
      authorId: user.id,
      ...body,
    });

    return response.task;
  }

  @Put('/:taskId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso',
    schema: GetTaskResponseSchema,
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
    summary: 'Atualizar tarefa',
    description: 'Utilize esse endpoint para atualizar uma tarefa especifica',
  })
  async updateTask(
    @Param() params: UpdateTaskParamsDTO,
    @Body() body: UpdateTaskBodyDTO,
    @AuthenticatedUser() user: UserType,
  ) {
    const response = await this.tasksService.updateTask({
      taskId: params.taskId,
      data: body,
      authorId: user.id,
    });

    return response.task;
  }

  @Delete('/:taskId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Tarefa deletada com sucesso',
    schema: GetTaskResponseSchema,
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
    summary: 'Deletar tarefa',
    description: 'Utilize esse endpoint para deletar uma tarefa especifica',
  })
  async deleteTask(@Param() params: DeleteTaskParamsDTO) {
    await this.tasksService.deleteTask(params);

    return;
  }
}
