import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { GetAssignmentsParamsDto } from '@repo/shared/dtos';
import { AuthenticatedUser } from '@/auth/decorators/authenticated-user.decorator';
import { type UserType } from '@/shared/types/user';
import { AuthenticatedRoute } from '@/auth/decorators/authenticated-route.decorator';
import { AssignmentsService } from './assignments.service';

@Controller('/tasks/:taskId/assignments')
@AuthenticatedRoute()
export class AssignmentsController {
  @Inject()
  private assignmentsService: AssignmentsService;

  @Get('/')
  async getAssignments(@Param() params: GetAssignmentsParamsDto) {
    return this.assignmentsService.getAssignments({
      taskId: params.taskId,
    });
  }

  @Post('/')
  async createAssignment(
    @Param() params: GetAssignmentsParamsDto,
    @AuthenticatedUser() user: UserType,
  ) {
    return this.assignmentsService.createAssignment({
      userId: user.id,
      taskId: params.taskId,
    });
  }
}
