import { CommentEntity } from '@/comments/infra/database/typeorm/entities/comment.typeorm.entity';
import { TaskEntity } from './task.typeorm.entity';

export const TypeORMEntities = [TaskEntity, CommentEntity];
