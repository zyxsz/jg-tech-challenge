import {
  Task,
  TaskPriority,
  TaskStatus,
} from '@/tasks/domain/entities/task.entity';
import { TasksRepository } from '@/tasks/domain/repositories/tasks.repository';
import { TaskOutputMapper } from '../dtos/task-output';

export interface CreateTaskUseCaseInput {
  authorId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  term: Date;
}

export interface CreateTaskUseCaseOutput {}

export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(
    input: CreateTaskUseCaseInput,
  ): Promise<CreateTaskUseCaseOutput> {
    const task = Task.create({
      authorId: input.authorId,
      title: input.title,
      description: input.description,
      priority: input.priority,
      status: input.status,
      term: input.term,
    });

    await this.tasksRepository.insert(task);

    return TaskOutputMapper.toOutput(task);
  }
}
