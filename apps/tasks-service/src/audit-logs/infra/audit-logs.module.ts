import { LocalAuditLogsService } from '@/audit-logs/infra/local-audit-logs.service';
import { AuditLogsService } from '@/shared/services/audit-logs.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuditLogsRepository } from '../domain/repositories/audit-logs.repository';
import { CreateAuditLogUseCase } from '../app/use-cases/create-audit-log.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: CreateAuditLogUseCase,
      useFactory: (auditLogsRepository: AuditLogsRepository) => {
        return new CreateAuditLogUseCase(auditLogsRepository);
      },
      inject: [AuditLogsRepository],
    },
    { provide: AuditLogsService, useClass: LocalAuditLogsService },
  ],
  exports: [AuditLogsService],
})
export class AuditLogsModule {}
