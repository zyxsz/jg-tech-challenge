import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { AuthenticatedUser } from '@/auth/decorators/authenticated-user.decorator';
import { type UserType } from '@/shared/types/user';
import { AuthenticatedRoute } from '@/auth/decorators/authenticated-route.decorator';
import { AssignmentsService } from './assignments.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateAssignmentResponseSchema,
  GetTaskAssignmentsResponseSchema,
} from '@/docs/examples/tasks-example';
import { GetAssignmentParamsDTO } from '@repo/dtos/tasks/assignments';

@Controller('/tasks/:taskId/assignments')
@AuthenticatedRoute()
@ApiBearerAuth()
@ApiTags('Tasks assignments')
export class AssignmentsController {
  @Inject()
  private assignmentsService: AssignmentsService;

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listagem de associações',
    description:
      'Utilize esse endpoint para listar todas as associações de uma tarefa especifica',
  })
  @ApiResponse({
    status: 200,
    description: 'Listagem de associações de uma tarefa',
    schema: GetTaskAssignmentsResponseSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Token de acesso invalido',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  async getAssignments(@Param() params: GetAssignmentParamsDTO) {
    return this.assignmentsService.getAssignments({
      taskId: params.taskId,
    });
  }

  @Post('/me')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Se associe a uma tarefa',
    description:
      'Utilize esse endpoint para se associar diretamente a uma tarefa',
  })
  @ApiResponse({
    status: 201,
    description: 'Associação criada com sucesso',
    schema: CreateAssignmentResponseSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Token de acesso invalido',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Você já está associado a essa tarefa',
  })
  async createAssignment(
    @Param() params: GetAssignmentParamsDTO,
    @AuthenticatedUser() user: UserType,
  ) {
    return this.assignmentsService.createAssignment({
      userId: user.id,
      taskId: params.taskId,
    });
  }
}
