import { Module } from '@nestjs/common';
import { TypeORMModule } from '@/shared/infra/database/typeorm/typeorm.module';
import { UsersRepository } from '@/users/domain/repositories/users.repository';
import { UsersTypeORMRepository } from './typeorm/repositories/users.typeorm.repository';

@Module({
  imports: [TypeORMModule],
  providers: [{ provide: UsersRepository, useClass: UsersTypeORMRepository }],
  exports: [UsersRepository],
})
export class DatabaseModule {}
