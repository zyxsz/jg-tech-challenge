import { CommentsRepository } from '@/comments/domain/repositories/comment.repository';
import { CommentOutput, CommentOutputMapper } from '../dtos/comment-output.dto';
import { PaginationOutput } from '@repo/shared/domain';

export interface GetCommentsWithPaginationUseCaseInput {
  taskId: string;
  page: number;
  limitPerPage?: number;
}

export interface GetCommentsWithPaginationUseCaseOutput
  extends PaginationOutput<CommentOutput> {}

export class GetCommentsWithPaginationUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(
    input: GetCommentsWithPaginationUseCaseInput,
  ): Promise<GetCommentsWithPaginationUseCaseOutput> {
    const result = await this.commentsRepository.findManyByTaskIdWithPagination(
      input.taskId,
      { page: input.page, limitPerPage: input.limitPerPage ?? 5 },
    );

    return {
      data: result.data.map((comment) => CommentOutputMapper.toOutput(comment)),
      pagination: result.pagination,
    };
  }
}
