import { PaginationInput, PaginationOutput } from '@repo/shared/domain';
import { Comment } from '../entities/comment.entity';

export abstract class CommentRepository {
  abstract findManyWithPagination(
    data: PaginationInput,
  ): Promise<PaginationOutput<Comment>>;
  abstract insert(entity: Comment): Promise<void>;
}
