import { TasksRepository } from '@/tasks/domain/repositories/tasks.repository';
import { TaskOutput, TaskOutputMapper } from '../dtos/task-output';
import { PaginationOutput } from '@repo/shared/domain';

export interface GetTasksWithPaginationUseCaseInput {
  page: number;
  limitPerPage?: number;
}

export interface GetTasksWithPaginationUseCaseOutput
  extends PaginationOutput<TaskOutput> {}

export class GetTasksWithPaginationUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(
    input: GetTasksWithPaginationUseCaseInput,
  ): Promise<GetTasksWithPaginationUseCaseOutput> {
    const result = await this.tasksRepository.findManyWithPagination({
      page: input.page,
      limitPerPage: input.limitPerPage ?? 15,
    });

    return {
      data: result.data.map((task) => TaskOutputMapper.toOutput(task)),
      pagination: result.pagination,
    };
  }
}
