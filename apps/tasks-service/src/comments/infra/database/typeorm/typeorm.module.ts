import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeORMEntities } from './entities';
import { CommentEntity } from './entities/comment.typeorm.entity';
import { CommentsRepository } from '@/comments/domain/repositories/comment.repository';
import { CommentsTypeORMRepository } from './repositories/tasks.typeorm.repository';

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
      provide: 'COMMENTS_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(CommentEntity),
      inject: ['TYPEORM_DATA_SOURCE'],
    },
    { provide: CommentsRepository, useClass: CommentsTypeORMRepository },
  ],
  exports: [CommentsRepository],
})
export class TypeORMModule {}
