import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CommentsController } from './comments.controller';
import { CreateCommentUseCase } from '../app/use-cases/create-comment.use-case';
import { CommentsRepository } from '../domain/repositories/comment.repository';
import { GetCommentsWithPaginationUseCase } from '../app/use-cases/get-comments-with-pagination.use-case';
import { ServicesModule } from '@/shared/infra/services/services.module';
import { TasksModule } from '@/tasks/infra/tasks.module';
import { AssignmentsModule } from '@/assignments/infra/assignments.module';

@Module({
  imports: [DatabaseModule, ServicesModule, TasksModule, AssignmentsModule],
  controllers: [CommentsController],
  providers: [
    {
      provide: CreateCommentUseCase,
      useFactory: (commentsRepository: CommentsRepository) => {
        return new CreateCommentUseCase(commentsRepository);
      },
      inject: [CommentsRepository],
    },
    {
      provide: GetCommentsWithPaginationUseCase,
      useFactory: (commentsRepository: CommentsRepository) => {
        return new GetCommentsWithPaginationUseCase(commentsRepository);
      },
      inject: [CommentsRepository],
    },
  ],
})
export class CommentsModule {}
