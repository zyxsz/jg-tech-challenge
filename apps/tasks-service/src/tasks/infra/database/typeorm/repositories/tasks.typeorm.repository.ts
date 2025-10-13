import { TasksRepository } from '@/tasks/domain/repositories/tasks.repository';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.typeorm.entity';
import { Task } from '@/tasks/domain/entities/task.entity';
import { TasksTypeORMMapper } from '../mappers/tasks.typeorm.mapper';
import { PaginationInput, PaginationOutput } from '@repo/shared/domain';

export class TasksTypeORMRepository implements TasksRepository {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private usersRepository: Repository<TaskEntity>,
  ) {}

  async findById(id: string): Promise<Task> {
    const task = await this.usersRepository.findOne({ where: { id } });

    if (!task) throw new Error('Task not found');

    return TasksTypeORMMapper.toEntity(task);
  }

  async findManyWithPagination(
    data: PaginationInput,
  ): Promise<PaginationOutput<Task>> {
    const skip = (data.page - 1) * data.limitPerPage;

    const count = await this.usersRepository.count();
    const tasks = await this.usersRepository.find({
      skip,
      take: data.limitPerPage,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(count / data.limitPerPage);

    return {
      data: tasks.map((task) => TasksTypeORMMapper.toEntity(task)),
      pagination: {
        page: data.page,
        limitPerPage: data.limitPerPage,
        totalCount: count,
        totalPages: totalPages,
      },
    };
  }

  async insert(entity: Task): Promise<void> {
    await this.usersRepository.save(TasksTypeORMMapper.toORM(entity));
  }

  async update(entity: Task): Promise<void> {
    await this.usersRepository.update(
      { id: entity.id },
      TasksTypeORMMapper.toORM(entity),
    );
  }

  async delete(entity: Task): Promise<void> {
    await this.usersRepository.delete({ id: entity.id });
  }
}
