import { Module } from '@nestjs/common';
import { TypeORMModule } from '@/shared/infra/database/typeorm/typeorm.module';
import { AuditLogsRepository } from '@/audit-logs/domain/repositories/audit-logs.repository';
import { AuditLogsTypeORMRepository } from './typeorm/repositories/audit-logs.typeorm.repository';

@Module({
  imports: [TypeORMModule],
  providers: [
    { provide: AuditLogsRepository, useClass: AuditLogsTypeORMRepository },
  ],
  exports: [AuditLogsRepository],
})
export class DatabaseModule {}
