import {
  AuditLog,
  AuditLogActionType,
} from '@/audit-logs/domain/entities/audit-log.entity';

export interface AuditLogOutput {
  id: string;
  taskId: string;
  authorId: string;
  actionType: AuditLogActionType;
  modifications: object;
  createdAt: Date;
}

export class AuditLogOutputMapper {
  static toOutput(entity: AuditLog) {
    return {
      id: entity.id,
      taskId: entity.taskId,
      authorId: entity.authorId,
      actionType: entity.actionType,
      modifications: entity.modifications,
      createdAt: entity.createdAt,
    } satisfies AuditLogOutput;
  }
}
