import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users.typeorm.entity';
import { UsersTypeORMMapper } from '../mappers/users.typeorm.mapper';
import { UsersRepository } from '@/users/domain/repositories/users.repository';
import { User } from '@/users/domain/entities/user.entity';

export class UsersTypeORMRepository implements UsersRepository {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new Error('Not found');

    return UsersTypeORMMapper.toEntity(user);
  }

  async insert(entity: User): Promise<void> {
    await this.usersRepository.save(UsersTypeORMMapper.toORM(entity));
  }
}
