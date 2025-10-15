import { AuditLogEntity } from '@/audit-logs/infra/database/typeorm/entities/audit-log.typeorm.entity';
import { CommentEntity } from '@/comments/infra/database/typeorm/entities/comment.typeorm.entity';
import { TaskEntity } from '@/tasks/infra/database/typeorm/entities/task.typeorm.entity';
import { UserEntity } from '@/users/infra/database/typeorm/entities/users.typeorm.entity';

export const TypeOrmEntities = [
  TaskEntity,
  CommentEntity,
  AuditLogEntity,
  UserEntity,
];
