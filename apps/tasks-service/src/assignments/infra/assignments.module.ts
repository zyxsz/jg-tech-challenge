import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AssignmentsController } from './assignments.controller';
import { CreateAssignmentUseCase } from '../app/use-cases/create-assignment.use-case';
import { AssignmentsRepository } from '../domain/repositories/assignments.repository';
import { GetAssignmentsUseCase } from '../app/use-cases/get-assignments.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [AssignmentsController],
  providers: [
    {
      provide: CreateAssignmentUseCase,
      useFactory: (assignmentsRepository: AssignmentsRepository) => {
        return new CreateAssignmentUseCase(assignmentsRepository);
      },
      inject: [AssignmentsRepository],
    },
    {
      provide: GetAssignmentsUseCase,
      useFactory: (assignmentsRepository: AssignmentsRepository) => {
        return new GetAssignmentsUseCase(assignmentsRepository);
      },
      inject: [AssignmentsRepository],
    },
  ],
})
export class AssignmentsModule {}
