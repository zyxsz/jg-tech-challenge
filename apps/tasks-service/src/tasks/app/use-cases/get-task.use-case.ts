import { TasksRepository } from '@/tasks/domain/repositories/tasks.repository';
import { TaskOutput, TaskOutputMapper } from '../dtos/task-output';

export interface GetTaskUseCaseInput {
  taskId: string;
}

export interface GetTaskUseCaseOutput extends TaskOutput {}

export class GetTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(input: GetTaskUseCaseInput): Promise<GetTaskUseCaseOutput> {
    const task = await this.tasksRepository.findById(input.taskId);

    return TaskOutputMapper.toOutput(task);
  }
}
