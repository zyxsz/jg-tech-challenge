import { AuditLogActionType } from '@/audit-logs/domain/entities/audit-log.entity';
import { AuditLogsService } from '@/shared/services/audit-logs.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAuditLogUseCase } from '../app/use-cases/create-audit-log.use-case';

@Injectable()
export class LocalAuditLogsService implements AuditLogsService {
  @Inject()
  private createAuditLogUseCase: CreateAuditLogUseCase;

  async log(
    taskId: string,
    authorId: string,
    actionType: AuditLogActionType,
    modifications: object,
  ): Promise<void> {
    await this.createAuditLogUseCase.execute({
      taskId,
      authorId,
      actionType,
      modifications,
    });
  }
}
