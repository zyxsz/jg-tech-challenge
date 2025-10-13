import { TasksRepository } from '@/tasks/domain/repositories/tasks.repository';

export interface DeleteTaskUseCaseInput {
  taskId: string;
}

export type DeleteTaskUseCaseOutput = void;

export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(
    input: DeleteTaskUseCaseInput,
  ): Promise<DeleteTaskUseCaseOutput> {
    const task = await this.tasksRepository.findById(input.taskId);

    await this.tasksRepository.delete(task);

    return;
  }
}
