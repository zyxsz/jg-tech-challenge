import {
  Task,
  TaskPriority,
  TaskStatus,
} from '@/tasks/domain/entities/task.entity';

export interface TaskOutput {
  id: string;
  authorId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  term: Date;
}

export class TaskOutputMapper {
  static toOutput(entity: Task) {
    return {
      id: entity.id,
      authorId: entity.authorId,
      title: entity.title,
      description: entity.description,
      priority: entity.priority,
      status: entity.status,
      term: entity.term,
    } satisfies TaskOutput;
  }
}
