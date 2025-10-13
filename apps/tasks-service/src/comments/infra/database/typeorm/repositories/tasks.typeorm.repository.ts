import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.typeorm.entity';
import { PaginationInput, PaginationOutput } from '@repo/shared/domain';
import { CommentsRepository } from '@/comments/domain/repositories/comment.repository';
import { Comment } from '@/comments/domain/entities/comment.entity';
import { CommentsTypeORMMapper } from '../mappers/comments.typeorm.mapper';

export class CommentsTypeORMRepository implements CommentsRepository {
  constructor(
    @Inject('COMMENTS_REPOSITORY')
    private commentsRepository: Repository<CommentEntity>,
  ) {}

  async findManyByTaskIdWithPagination(
    taskId: string,
    data: PaginationInput,
  ): Promise<PaginationOutput<Comment>> {
    const skip = (data.page - 1) * data.limitPerPage;

    const count = await this.commentsRepository.count({ where: { taskId } });
    const tasks = await this.commentsRepository.find({
      where: { taskId },
      skip,
      take: data.limitPerPage,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(count / data.limitPerPage);

    return {
      data: tasks.map((task) => CommentsTypeORMMapper.toEntity(task)),
      pagination: {
        page: data.page,
        limitPerPage: data.limitPerPage,
        totalCount: count,
        totalPages: totalPages,
      },
    };
  }

  async insert(entity: Comment): Promise<void> {
    await this.commentsRepository.save(CommentsTypeORMMapper.toORM(entity));
  }
}
