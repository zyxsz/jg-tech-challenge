import {
  Body,
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
import {
  CreateAssignmentByEmailBodyDTO,
  GetAssignmentParamsDTO,
} from '@repo/dtos/tasks/assignments';

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
    const response = await this.assignmentsService.getAssignments({
      taskId: params.taskId,
    });

    return response.assignments;
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
  async createMeAssignment(
    @Param() params: GetAssignmentParamsDTO,
    @AuthenticatedUser() user: UserType,
  ) {
    const response = await this.assignmentsService.createAssignment({
      userId: user.id,
      taskId: params.taskId,
    });

    return response.assignment;
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Associe um usuário a uma tarefa',
    description:
      'Utilize esse endpoint para associar um usuário diretamente a uma tarefa utilizando o email',
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
    @Body() body: CreateAssignmentByEmailBodyDTO,
  ) {
    const response = await this.assignmentsService.createAssignmentByEmail({
      userEmail: body.email,
      taskId: params.taskId,
    });

    return response.assignment;
  }
}
