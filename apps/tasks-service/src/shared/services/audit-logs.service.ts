import { AuditLogActionType } from '@/audit-logs/domain/entities/audit-log.entity';

export abstract class AuditLogsService {
  abstract log(
    taskId: string,
    authorId: string,
    actionType: AuditLogActionType,
    modifications: object,
  ): Promise<void>;
}
