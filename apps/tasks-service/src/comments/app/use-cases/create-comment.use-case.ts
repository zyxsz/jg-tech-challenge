import { Comment } from '@/comments/domain/entities/comment.entity';
import { CommentsRepository } from '@/comments/domain/repositories/comment.repository';
import { CommentOutput, CommentOutputMapper } from '../dtos/comment-output.dto';
import { NotificationsService } from '@/shared/services/notifications.service';

export interface CreateCommentUseCaseInput {
  authorId: string;
  taskId: string;
  content: string;
}

export interface CreateCommentUseCaseOutput extends CommentOutput {}

export class CreateCommentUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private notificationsService: NotificationsService,
  ) {}

  async execute(
    input: CreateCommentUseCaseInput,
  ): Promise<CreateCommentUseCaseOutput> {
    const comment = Comment.create({
      authorId: input.authorId,
      taskId: input.taskId,
      content: input.content,
    });

    await this.commentsRepository.insert(comment);

    if (this.notificationsService) {
      await this.notificationsService.sendTaskCommentCreated({
        commentAuthorId: input.authorId,
        commentContent: input.content,
        taskAuthorId: input.authorId,
        taskId: input.taskId,
      });
    }

    return CommentOutputMapper.toOutput(comment);
  }
}
