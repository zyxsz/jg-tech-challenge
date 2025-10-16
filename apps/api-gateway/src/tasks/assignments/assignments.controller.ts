import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AuthenticatedUser } from '@/auth/decorators/authenticated-user.decorator';
import { type UserType } from '@/shared/types/user';
import { AuthenticatedRoute } from '@/auth/decorators/authenticated-route.decorator';
import { AssignmentsService } from './assignments.service';
import { GetAssignmentsDTO } from '@repo/dtos';

@Controller('/tasks/:taskId/assignments')
@AuthenticatedRoute()
export class AssignmentsController {
  @Inject()
  private assignmentsService: AssignmentsService;

  @Get('/')
  async getAssignments(@Param() params: GetAssignmentsDTO.Http.Params) {
    return this.assignmentsService.getAssignments({
      taskId: params.taskId,
    });
  }

  @Post('/')
  async createAssignment(
    @Param() params: GetAssignmentsDTO.Http.Params,
    @AuthenticatedUser() user: UserType,
  ) {
    return this.assignmentsService.createAssignment({
      userId: user.id,
      taskId: params.taskId,
    });
  }
}
