import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeORMEntities } from './entities';
import { TaskEntity } from './entities/task.typeorm.entity';
import { TasksRepository } from '@/tasks/domain/repositories/tasks.repository';
import { TasksTypeORMRepository } from './repositories/tasks.typeorm.repository';

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
          entities: TypeORMEntities,
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
    { provide: TasksRepository, useClass: TasksTypeORMRepository },
  ],
  exports: [TasksRepository],
})
export class TypeORMModule {}
