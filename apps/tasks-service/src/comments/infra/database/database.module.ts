import { CommentsRepository } from '@/comments/domain/repositories/comment.repository';
import { TypeORMModule } from '@/shared/infra/database/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { CommentsTypeORMRepository } from './typeorm/repositories/tasks.typeorm.repository';

@Module({
  imports: [TypeORMModule],
  providers: [
    { provide: CommentsRepository, useClass: CommentsTypeORMRepository },
  ],
  exports: [CommentsRepository],
})
export class DatabaseModule {}
