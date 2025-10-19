import { Controller, Inject } from '@nestjs/common';
import { GetCommentsWithPaginationUseCase } from '../app/use-cases/get-comments-with-pagination.use-case';
import { CreateCommentUseCase } from '../app/use-cases/create-comment.use-case';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCommentDTO, GetCommentsWithPaginationDTO } from '@repo/dtos';
import { TasksService } from '@repo/constants/services';
import { NotificationsService } from '@/shared/services/notifications.service';
import { GetTaskUseCase } from '@/tasks/app/use-cases/get-task.use-case';
import { GetAssignmentsUseCase } from '@/assignments/app/use-cases/get-assignments.use-case';
import { TaskCommentCreatedEvent } from '@repo/dtos/types/tasks';

@Controller()
export class CommentsController {
  // Services
  @Inject()
  private notificationsService: NotificationsService;

  // Use cases
  @Inject()
  private getCommentsWithPaginationUseCase: GetCommentsWithPaginationUseCase;

  @Inject()
  private createCommentUseCase: CreateCommentUseCase;

  // Tasks
  @Inject()
  private getTaskUseCase: GetTaskUseCase;

  // Assignments
  @Inject()
  private getAssignmentUseCase: GetAssignmentsUseCase;

  @MessagePattern(TasksService.Comments.Messages.CREATE_COMMENT)
  async createComment(
    @Payload() payload: CreateCommentDTO.Microservice.Payload,
  ) {
    const task = await this.getTaskUseCase.execute({ taskId: payload.taskId });
    const taskAssignments = await this.getAssignmentUseCase.execute({
      taskId: task.id,
    });
    const output = await this.createCommentUseCase.execute(payload);

    taskAssignments.forEach((assignment) => {
      this.notificationsService.emitTaskCommentCreated(
        new TaskCommentCreatedEvent(task, output, assignment.userId),
      );
    });

    return output;
  }

  @MessagePattern(TasksService.Comments.Messages.GET_COMMENTS_WITH_PAGINATION)
  async getCommentsWithPagination(
    @Payload() payload: GetCommentsWithPaginationDTO.Microservice.Payload,
  ) {
    return this.getCommentsWithPaginationUseCase.execute(payload);
  }
}
