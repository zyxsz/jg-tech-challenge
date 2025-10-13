import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TasksController } from './tasks.controller';
import { GetTaskUseCase } from '../app/use-cases/get-task.use-case';
import { TasksRepository } from '../domain/repositories/tasks.repository';
import { GetTasksWithPaginationUseCase } from '../app/use-cases/get-tasks-with-pagination.use-case';
import { CreateTaskUseCase } from '../app/use-cases/create-task.use-case';
import { UpdateTaskUseCase } from '../app/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../app/use-cases/delete-task.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [
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
      useFactory: (tasksRepository: TasksRepository) => {
        return new CreateTaskUseCase(tasksRepository);
      },
      inject: [TasksRepository],
    },
    {
      provide: UpdateTaskUseCase,
      useFactory: (tasksRepository: TasksRepository) => {
        return new UpdateTaskUseCase(tasksRepository);
      },
      inject: [TasksRepository],
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
