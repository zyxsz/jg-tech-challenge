import { Comment } from '@/comments/domain/entities/comment.entity';

export interface CommentOutput {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: Date;

  relations?: {
    author?: {
      id: string;
      email: string;
      username: string;
    };
  };
}

export class CommentOutputMapper {
  static toOutput(entity: Comment) {
    return {
      id: entity.id,
      taskId: entity.taskId,
      authorId: entity.authorId,
      content: entity.content,
      createdAt: entity.createdAt,
      relations: entity.relations
        ? {
            author: entity.relations.author
              ? {
                  id: entity.relations.author.id,
                  username: entity.relations.author.username,
                  email: entity.relations.author.email,
                }
              : undefined,
          }
        : undefined,
    } satisfies CommentOutput;
  }
}
