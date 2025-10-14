import { PaginationInput, PaginationOutput } from '@repo/shared/domain';
import { AuditLog } from '../entities/audit-log.entity';

export abstract class AuditLogsRepository {
  abstract insert(entity: AuditLog): Promise<void>;
  abstract findManyByTaskIdWithPagination(
    taskId: string,
    data: PaginationInput,
  ): Promise<PaginationOutput<AuditLog>>;
}
