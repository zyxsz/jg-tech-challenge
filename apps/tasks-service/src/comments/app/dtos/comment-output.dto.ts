import { Comment } from '@/comments/domain/entities/comment.entity';

export interface CommentOutput {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

export class CommentOutputMapper {
  static toOutput(entity: Comment) {
    return {
      id: entity.id,
      taskId: entity.taskId,
      authorId: entity.authorId,
      content: entity.content,
      createdAt: entity.createdAt,
    } satisfies CommentOutput;
  }
}
