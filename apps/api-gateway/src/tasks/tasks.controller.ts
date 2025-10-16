import {
  Body,
  Controller,
  Delete,
  Get,
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
  CreateTaskDTO,
  DeleteTaskDTO,
  GetTaskDTO,
  GetTasksWithPaginationDTO,
  UpdateTaskDTO,
} from '@repo/dtos';

@Controller('/tasks')
@AuthenticatedRoute()
export class TasksController {
  @Inject()
  private tasksService: TasksService;

  @Get('/')
  async getTasksWithPagination(
    @Query() query: GetTasksWithPaginationDTO.Http.QueryParams,
  ) {
    console.log(query);

    return await this.tasksService.getTasksWithPagination(query);
  }

  @Get('/:taskId')
  async getTask(@Param() params: GetTaskDTO.Http.Params) {
    return await this.tasksService.getTask(params);
  }

  @Post('/')
  async createTask(
    @AuthenticatedUser() user: UserType,
    @Body() body: CreateTaskDTO.Http.Body,
  ) {
    return await this.tasksService.createTask({
      authorId: user.id,
      ...body,
    });
  }

  @Put('/:taskId')
  async updateTask(
    @Param() params: UpdateTaskDTO.Http.Params,
    @Body() body: UpdateTaskDTO.Http.Body,
    @AuthenticatedUser() user: UserType,
  ) {
    return await this.tasksService.updateTask({
      taskId: params.taskId,
      data: body,
      authorId: user.id,
    });
  }

  @Delete('/:taskId')
  async deleteTask(@Param() params: DeleteTaskDTO.Http.Params) {
    await this.tasksService.deleteTask(params);

    return;
  }
}
