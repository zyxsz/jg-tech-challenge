import { AssignmentsRepository } from '@/assignments/domain/repositories/assignments.repository';
import { TypeORMModule } from '@/shared/infra/database/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { AssignmentsTypeORMRepository } from './typeorm/repositories/tasks.typeorm.repository';

@Module({
  imports: [TypeORMModule],
  providers: [
    { provide: AssignmentsRepository, useClass: AssignmentsTypeORMRepository },
  ],
  exports: [AssignmentsRepository],
})
export class DatabaseModule {}

//ds
