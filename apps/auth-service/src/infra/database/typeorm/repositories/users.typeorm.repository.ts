import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.typeorm.entity';
import { UsersRepository } from '../../../../app/domain/repositories/users.repository';
import { User } from '../../../../app/domain/entities/user.entity';
import { UsersTypeORMMapper } from '../mappers/users.typeorm.mapper';
import { NotFoundError } from '@repo/errors/exceptions';

export class UsersTypeORMRepository implements UsersRepository {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundError('Usuário não encontrado');

    return UsersTypeORMMapper.toEntity(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) throw new NotFoundError('Usuário não encontrado');

    return UsersTypeORMMapper.toEntity(user);
  }

  async insert(entity: User): Promise<void> {
    await this.usersRepository.save(UsersTypeORMMapper.toORM(entity));
  }
}
