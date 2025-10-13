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
import {
  CreateTaskBodyDto,
  DeleteTaskDto,
  GetTaskDto,
  GetTasksWithPaginationDto,
  UpdateTaskBodyDto,
  UpdateTaskParamsDto,
} from '@repo/shared/dtos';
import { AuthenticatedRoute } from '@/auth/decorators/authenticated-route.decorator';
import { AuthenticatedUser } from '@/auth/decorators/authenticated-user.decorator';
import type { UserType } from '@/shared/types/user';

@Controller('/tasks')
@AuthenticatedRoute()
export class TasksController {
  @Inject()
  private tasksService: TasksService;

  @Get('/')
  async getTasksWithPagination(@Query() query: GetTasksWithPaginationDto) {
    return await this.tasksService.getTasksWithPagination(query);
  }

  @Get('/:taskId')
  async getTask(@Param() params: GetTaskDto) {
    return await this.tasksService.getTask(params);
  }

  @Post('/')
  async createTask(
    @AuthenticatedUser() user: UserType,
    @Body() body: CreateTaskBodyDto,
  ) {
    return await this.tasksService.createTask({
      authorId: user.id,
      ...body,
    });
  }

  @Put('/:taskId')
  async updateTask(
    @Param() params: UpdateTaskParamsDto,
    @Body() body: UpdateTaskBodyDto,
  ) {
    return await this.tasksService.updateTask({
      taskId: params.taskId,
      data: body,
    });
  }

  @Delete('/:taskId')
  async deleteTask(@Param() params: DeleteTaskDto) {
    await this.tasksService.deleteTask(params);

    return;
  }
}
