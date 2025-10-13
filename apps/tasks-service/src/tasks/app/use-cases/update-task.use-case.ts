import { TasksRepository } from '@/tasks/domain/repositories/tasks.repository';
import { TaskOutput, TaskOutputMapper } from '../dtos/task-output';
import { TaskProps } from '@/tasks/domain/entities/task.entity';

export interface UpdateTaskUseCaseInput {
  taskId: string;

  data: Partial<
    Pick<TaskProps, 'title' | 'description' | 'priority' | 'status' | 'term'>
  >;
}

export interface UpdateTaskUseCaseOutput extends TaskOutput {}

export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(
    input: UpdateTaskUseCaseInput,
  ): Promise<UpdateTaskUseCaseOutput> {
    const task = await this.tasksRepository.findById(input.taskId);

    if (input.data.title) task.title = input.data.title;
    if (input.data.description) task.description = input.data.description;
    if (input.data.priority) task.priority = input.data.priority;
    if (input.data.status) task.status = input.data.status;
    if (input.data.term) task.term = input.data.term;

    await this.tasksRepository.update(task);

    return TaskOutputMapper.toOutput(task);
  }
}
