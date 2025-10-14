import { Module } from '@nestjs/common';
import { TasksRepository } from '@/tasks/domain/repositories/tasks.repository';
import { TasksTypeORMRepository } from './typeorm/repositories/tasks.typeorm.repository';
import { TypeORMModule } from '@/shared/infra/database/typeorm/typeorm.module';

@Module({
  imports: [TypeORMModule],
  providers: [{ provide: TasksRepository, useClass: TasksTypeORMRepository }],
  exports: [TasksRepository],
})
export class DatabaseModule {}
