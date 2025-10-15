import { CommentEntity } from '../entities/comment.typeorm.entity';
import { Comment } from '@/comments/domain/entities/comment.entity';
import { UsersTypeORMMapper } from '@/users/infra/database/typeorm/mappers/users.typeorm.mapper';

export class CommentsTypeORMMapper {
  static toEntity(entity: CommentEntity) {
    return Comment.create(
      {
        authorId: entity.authorId,
        taskId: entity.taskId,
        content: entity.content,
        createdAt: entity.createdAt,
      },
      entity.id,
      {
        author: entity.author
          ? UsersTypeORMMapper.toEntity(entity.author)
          : undefined,
      },
    );
  }

  static toORM(comment: Comment) {
    return {
      id: comment.id,
      authorId: comment.authorId,
      taskId: comment.taskId,
      content: comment.content,
      createdAt: comment.createdAt,
    };
  }
}
