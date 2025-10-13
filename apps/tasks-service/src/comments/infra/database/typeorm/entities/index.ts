import { TaskEntity } from '@/tasks/infra/database/typeorm/entities/task.typeorm.entity';
import { CommentEntity } from './comment.typeorm.entity';

export const TypeORMEntities = [CommentEntity, TaskEntity];
