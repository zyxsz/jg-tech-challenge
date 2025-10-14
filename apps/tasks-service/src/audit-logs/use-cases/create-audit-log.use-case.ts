import {
  AuditLog,
  AuditLogActionType,
} from '../domain/entities/audit-log.entity';
import { AuditLogsRepository } from '../domain/repositories/audit-logs.repository';
import {
  AuditLogOutput,
  AuditLogOutputMapper,
} from './dtos/audit-log-output.dto';

export interface CreateAuditLogUseCaseInput {
  taskId: string;
  authorId: string;
  actionType: AuditLogActionType;
  modifications: object;
}

export interface CreateAuditLogUseCaseOutput extends AuditLogOutput {}

export class CreateAuditLogUseCase {
  constructor(private auditLogsRepository: AuditLogsRepository) {}

  async execute(
    input: CreateAuditLogUseCaseInput,
  ): Promise<CreateAuditLogUseCaseOutput> {
    const auditLog = AuditLog.create({
      taskId: input.taskId,
      authorId: input.authorId,
      actionType: input.actionType,
      modifications: input.modifications,
    });

    await this.auditLogsRepository.insert(auditLog);

    return AuditLogOutputMapper.toOutput(auditLog);
  }
}
