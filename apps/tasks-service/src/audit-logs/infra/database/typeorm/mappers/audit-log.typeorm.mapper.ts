import { AuditLog } from '@/audit-logs/domain/entities/audit-log.entity';
import { AuditLogEntity } from '../entities/audit-log.typeorm.entity';

export class AuditLogsTypeORMMapper {
  static toEntity(entity: AuditLogEntity) {
    return AuditLog.create(
      {
        authorId: entity.authorId,
        taskId: entity.taskId,
        actionType: entity.actionType,
        modifications: entity.modifications,
        createdAt: entity.createdAt,
      },
      entity.id,
    );
  }

  static toORM(log: AuditLog) {
    return {
      id: log.id,
      authorId: log.authorId,
      taskId: log.taskId,
      actionType: log.actionType,
      modifications: log.modifications,
      createdAt: log.createdAt,
    };
  }
}
