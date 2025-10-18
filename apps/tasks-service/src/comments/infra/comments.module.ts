import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CommentsController } from './comments.controller';
import { CreateCommentUseCase } from '../app/use-cases/create-comment.use-case';
import { CommentsRepository } from '../domain/repositories/comment.repository';
import { GetCommentsWithPaginationUseCase } from '../app/use-cases/get-comments-with-pagination.use-case';
import { ServicesModule } from '@/shared/infra/services/services.module';
import { NotificationsService } from '@/shared/services/notifications.service';

@Module({
  imports: [DatabaseModule, ServicesModule],
  controllers: [CommentsController],
  providers: [
    {
      provide: CreateCommentUseCase,
      useFactory: (
        commentsRepository: CommentsRepository,
        notificationsService: NotificationsService,
      ) => {
        return new CreateCommentUseCase(
          commentsRepository,
          notificationsService,
        );
      },
      inject: [CommentsRepository, NotificationsService],
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
