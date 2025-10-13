import { Comment } from '@/comments/domain/entities/comment.entity';
import { CommentsRepository } from '@/comments/domain/repositories/comment.repository';
import { CommentOutput, CommentOutputMapper } from '../dtos/comment-output.dto';

export interface CreateCommentUseCaseInput {
  authorId: string;
  taskId: string;
  content: string;
}

export interface CreateCommentUseCaseOutput extends CommentOutput {}

export class CreateCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(
    input: CreateCommentUseCaseInput,
  ): Promise<CreateCommentUseCaseOutput> {
    const comment = Comment.create({
      authorId: input.authorId,
      taskId: input.taskId,
      content: input.content,
    });

    await this.commentsRepository.insert(comment);

    return CommentOutputMapper.toOutput(comment);
  }
}
