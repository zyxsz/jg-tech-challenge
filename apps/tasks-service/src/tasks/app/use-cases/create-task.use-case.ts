import {
  Task,
  TaskPriority,
  TaskStatus,
} from '@/tasks/domain/entities/task.entity';
import { TasksRepository } from '@/tasks/domain/repositories/tasks.repository';
import { TaskOutput, TaskOutputMapper } from '../dtos/task-output';
import { AuditLogsService } from '@/shared/services/audit-logs.service';
import { NotificationsService } from '@/shared/services/notifications.service';

export interface CreateTaskUseCaseInput {
  authorId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  term: Date;
}

export interface CreateTaskUseCaseOutput extends TaskOutput {}

export class CreateTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private auditLogsService: AuditLogsService,
    private notificationsService: NotificationsService,
  ) {}

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

    if (this.auditLogsService) {
      await this.auditLogsService.log(task.id, input.authorId, 'CREATE', {
        title: input.title,
        description: input.description,
        priority: input.priority,
        status: input.status,
        term: input.term,
      });
    }

    if (this.notificationsService) {
      await this.notificationsService.sendCreateTask({
        authorId: input.authorId,
        title: input.title,
        taskId: task.id,
      });
    }

    return TaskOutputMapper.toOutput(task);
  }
}
