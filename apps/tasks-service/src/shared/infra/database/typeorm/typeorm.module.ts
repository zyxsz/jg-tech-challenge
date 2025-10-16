import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmEntities } from './entities';
import { TaskEntity } from '@/tasks/infra/database/typeorm/entities/task.typeorm.entity';
import { CommentEntity } from '@/comments/infra/database/typeorm/entities/comment.typeorm.entity';
import { AuditLogEntity } from '@/audit-logs/infra/database/typeorm/entities/audit-log.typeorm.entity';
import { UserEntity } from '@/users/infra/database/typeorm/entities/users.typeorm.entity';
import { AssignmentEntity } from '@/assignments/infra/database/typeorm/entities/assignment.typeorm.entity';

@Module({
  imports: [],
  providers: [
    {
      provide: 'TYPEORM_DATA_SOURCE',
      useFactory: async (configService: ConfigService) => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT') || undefined,
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_DB'),
          entities: TypeOrmEntities,
          ssl: true,
          synchronize: false,
        });

        return dataSource.initialize();
      },
      inject: [ConfigService],
    },
    {
      provide: 'TASKS_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(TaskEntity),
      inject: ['TYPEORM_DATA_SOURCE'],
    },
    {
      provide: 'COMMENTS_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(CommentEntity),
      inject: ['TYPEORM_DATA_SOURCE'],
    },
    {
      provide: 'AUDIT_LOGS_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AuditLogEntity),
      inject: ['TYPEORM_DATA_SOURCE'],
    },
    {
      provide: 'USERS_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: ['TYPEORM_DATA_SOURCE'],
    },
    {
      provide: 'ASSIGNMENTS_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AssignmentEntity),
      inject: ['TYPEORM_DATA_SOURCE'],
    },
  ],
  exports: [
    'TYPEORM_DATA_SOURCE',
    'TASKS_REPOSITORY',
    'COMMENTS_REPOSITORY',
    'AUDIT_LOGS_REPOSITORY',
    'USERS_REPOSITORY',
    'ASSIGNMENTS_REPOSITORY',
  ],
})
export class TypeORMModule {}
