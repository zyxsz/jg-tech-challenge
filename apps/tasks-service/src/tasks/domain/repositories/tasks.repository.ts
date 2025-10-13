import { PaginationInput, PaginationOutput } from '@repo/shared/domain';
import { Task } from '../entities/task.entity';

export abstract class TasksRepository {
  abstract findById(id: string): Promise<Task>;
  abstract findManyWithPagination(
    data: PaginationInput,
  ): Promise<PaginationOutput<Task>>;

  abstract insert(entity: Task): Promise<void>;
  abstract update(entity: Task): Promise<void>;
  abstract delete(entity: Task): Promise<void>;
}
