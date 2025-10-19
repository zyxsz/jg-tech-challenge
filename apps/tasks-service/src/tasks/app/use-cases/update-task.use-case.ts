import { TasksRepository } from '@/tasks/domain/repositories/tasks.repository';
import { TaskOutput } from '../dtos/task-output';
import { TaskProps } from '@/tasks/domain/entities/task.entity';
import { AuditLogsService } from '@/shared/services/audit-logs.service';
import { ObjectDiffProvider } from '@/shared/providers/object-diff.provider';

export interface UpdateTaskUseCaseInput {
  authorId: string;
  taskId: string;

  data: Partial<
    Pick<TaskProps, 'title' | 'description' | 'priority' | 'status' | 'term'>
  >;
}

export interface UpdateTaskUseCaseOutput {
  updatedTask: TaskOutput;
  outdatedTask: TaskOutput;
}

export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(
    input: UpdateTaskUseCaseInput,
  ): Promise<UpdateTaskUseCaseOutput> {
    const task = await this.tasksRepository.findById(input.taskId);
    const firstOutput = {
      id: task.id,
      authorId: task.authorId,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      term: task.term,
      createdAt: task.createdAt,
    } satisfies TaskOutput;

    if (input.data.title) task.title = input.data.title;
    if (input.data.description) task.description = input.data.description;
    if (input.data.priority) task.priority = input.data.priority;
    if (input.data.status) task.status = input.data.status;
    if (input.data.term) task.term = input.data.term;

    await this.tasksRepository.update(task);

    const updatedOutput = {
      id: task.id,
      authorId: task.authorId,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      term: task.term,
      createdAt: task.createdAt,
    } satisfies TaskOutput;

    return {
      updatedTask: updatedOutput,
      outdatedTask: firstOutput,
    };
  }
}
