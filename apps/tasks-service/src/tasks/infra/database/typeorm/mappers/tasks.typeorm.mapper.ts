import { Task } from '@/tasks/domain/entities/task.entity';
import { TaskEntity } from '../entities/task.typeorm.entity';

export class TasksTypeORMMapper {
  static toEntity(entity: TaskEntity) {
    return Task.create(
      {
        authorId: entity.authorId,
        title: entity.title,
        description: entity.description,
        priority: entity.priority,
        status: entity.status,
        term: entity.term,
        createdAt: entity.createdAt,
      },
      entity.id,
    );
  }

  static toORM(task: Task) {
    return {
      id: task.id,
      authorId: task.authorId,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      term: task.term,
      createdAt: task.createdAt,
    };
  }
}
