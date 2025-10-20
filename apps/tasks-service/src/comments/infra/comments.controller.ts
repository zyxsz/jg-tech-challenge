import { Controller, Inject } from '@nestjs/common';
import { GetCommentsWithPaginationUseCase } from '../app/use-cases/get-comments-with-pagination.use-case';
import { CreateCommentUseCase } from '../app/use-cases/create-comment.use-case';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from '@repo/constants/services';
import { NotificationsService } from '@/shared/services/notifications.service';
import { GetTaskUseCase } from '@/tasks/app/use-cases/get-task.use-case';
import { GetAssignmentsUseCase } from '@/assignments/app/use-cases/get-assignments.use-case';
import { TaskCommentCreatedEvent } from '@repo/dtos/tasks';
import {
  CreateCommentMessageInput,
  CreateCommentMessageOutput,
  GetCommentsWithPaginationMessageInput,
  GetCommentsWithPaginationMessageOutput,
} from '@repo/dtos/tasks/comments';

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
    @Payload() payload: CreateCommentMessageInput,
  ): Promise<CreateCommentMessageOutput> {
    const task = await this.getTaskUseCase.execute({ taskId: payload.taskId });
    const taskAssignments = await this.getAssignmentUseCase.execute({
      taskId: task.id,
    });
    const output = await this.createCommentUseCase.execute({
      authorId: payload.authorId,
      content: payload.content,
      taskId: payload.taskId,
    });

    taskAssignments.forEach((assignment) => {
      this.notificationsService.emitTaskCommentCreated(
        new TaskCommentCreatedEvent(task, output, assignment.userId),
      );
    });

    return {
      comment: output,
    };
  }

  @MessagePattern(TasksService.Comments.Messages.GET_COMMENTS_WITH_PAGINATION)
  async getCommentsWithPagination(
    @Payload() payload: GetCommentsWithPaginationMessageInput,
  ): Promise<GetCommentsWithPaginationMessageOutput> {
    return this.getCommentsWithPaginationUseCase.execute({
      page: payload.page,
      limitPerPage: payload.limitPerPage,
      taskId: payload.taskId,
    });
  }
}
