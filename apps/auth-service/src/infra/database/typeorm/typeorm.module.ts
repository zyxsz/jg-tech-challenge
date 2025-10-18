import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeORMEntities } from './entities';
import { UserEntity } from './entities/user.typeorm.entity';
import { UsersRepository } from '../../../app/domain/repositories/users.repository';
import { UsersTypeORMRepository } from './repositories/users.typeorm.repository';

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
          ssl: configService.get('DATABASE_SSL')
            ? configService.get('DATABASE_SSL') === 'true'
            : false,
          synchronize: false,
        });

        return dataSource.initialize();
      },
      inject: [ConfigService],
    },
    {
      provide: 'USERS_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: ['TYPEORM_DATA_SOURCE'],
    },
    { provide: UsersRepository, useClass: UsersTypeORMRepository },
  ],
  exports: [UsersRepository],
})
export class TypeORMModule {}
