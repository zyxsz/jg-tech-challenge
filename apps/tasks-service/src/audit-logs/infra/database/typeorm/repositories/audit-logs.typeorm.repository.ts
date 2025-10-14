import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginationInput, PaginationOutput } from '@repo/shared/domain';
import { AuditLogEntity } from '../entities/audit-log.typeorm.entity';
import { AuditLogsRepository } from '@/audit-logs/domain/repositories/audit-logs.repository';
import { AuditLog } from '@/audit-logs/domain/entities/audit-log.entity';
import { AuditLogsTypeORMMapper } from '../mappers/audit-log.typeorm.mapper';

export class AuditLogsTypeORMRepository implements AuditLogsRepository {
  constructor(
    @Inject('AUDIT_LOGS_REPOSITORY')
    private auditLogsRepository: Repository<AuditLogEntity>,
  ) {}

  async findManyByTaskIdWithPagination(
    taskId: string,
    data: PaginationInput,
  ): Promise<PaginationOutput<AuditLog>> {
    const skip = (data.page - 1) * data.limitPerPage;

    const count = await this.auditLogsRepository.count({ where: { taskId } });
    const logs = await this.auditLogsRepository.find({
      where: { taskId },
      skip,
      take: data.limitPerPage,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(count / data.limitPerPage);

    return {
      data: logs.map((log) => AuditLogsTypeORMMapper.toEntity(log)),
      pagination: {
        page: data.page,
        limitPerPage: data.limitPerPage,
        totalCount: count,
        totalPages: totalPages,
      },
    };
  }

  async insert(entity: AuditLog): Promise<void> {
    await this.auditLogsRepository.save(AuditLogsTypeORMMapper.toORM(entity));
  }
}
