import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TasksController } from './tasks.controller';
import { GetTaskUseCase } from '../app/use-cases/get-task.use-case';
import { TasksRepository } from '../domain/repositories/tasks.repository';
import { GetTasksWithPaginationUseCase } from '../app/use-cases/get-tasks-with-pagination.use-case';
import { CreateTaskUseCase } from '../app/use-cases/create-task.use-case';
import { UpdateTaskUseCase } from '../app/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../app/use-cases/delete-task.use-case';
import { AuditLogsModule } from '@/audit-logs/infra/audit-logs.module';
import { AuditLogsService } from '@/shared/services/audit-logs.service';
import { ObjectDiffProvider } from '@/shared/providers/object-diff.provider';
import { LibObjectDiffProvider } from '@/shared/infra/providers/lib-object-diff.provider';

@Module({
  imports: [DatabaseModule, AuditLogsModule],
  controllers: [TasksController],
  providers: [
    { provide: ObjectDiffProvider, useClass: LibObjectDiffProvider },
    {
      provide: GetTaskUseCase,
      useFactory: (tasksRepository: TasksRepository) => {
        return new GetTaskUseCase(tasksRepository);
      },
      inject: [TasksRepository],
    },
    {
      provide: GetTasksWithPaginationUseCase,
      useFactory: (tasksRepository: TasksRepository) => {
        return new GetTasksWithPaginationUseCase(tasksRepository);
      },
      inject: [TasksRepository],
    },
    {
      provide: CreateTaskUseCase,
      useFactory: (
        tasksRepository: TasksRepository,
        auditLogsService: AuditLogsService,
      ) => {
        return new CreateTaskUseCase(tasksRepository, auditLogsService);
      },
      inject: [TasksRepository, AuditLogsService],
    },
    {
      provide: UpdateTaskUseCase,
      useFactory: (
        tasksRepository: TasksRepository,
        auditLogsService: AuditLogsService,
        objectDiffProvider: ObjectDiffProvider,
      ) => {
        return new UpdateTaskUseCase(
          tasksRepository,
          auditLogsService,
          objectDiffProvider,
        );
      },
      inject: [TasksRepository, AuditLogsService, ObjectDiffProvider],
    },
    {
      provide: DeleteTaskUseCase,
      useFactory: (tasksRepository: TasksRepository) => {
        return new DeleteTaskUseCase(tasksRepository);
      },
      inject: [TasksRepository],
    },
  ],
})
export class TasksModule {}
