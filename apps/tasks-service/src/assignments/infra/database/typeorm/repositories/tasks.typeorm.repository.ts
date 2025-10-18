import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssignmentsRepository } from '@/assignments/domain/repositories/assignments.repository';
import { AssignmentEntity } from '../entities/assignment.typeorm.entity';
import { Assignment } from '@/assignments/domain/entities/assignment.entity';
import { AssignmentsTypeORMMapper } from '../mappers/assignments.typeorm.mapper';
import { NotFoundError } from '@repo/errors/exceptions';

export class AssignmentsTypeORMRepository implements AssignmentsRepository {
  constructor(
    @Inject('ASSIGNMENTS_REPOSITORY')
    private assignmentsRepository: Repository<AssignmentEntity>,
  ) {}

  async findByUserIdAndTaskId(
    userId: string,
    taskId: string,
  ): Promise<Assignment> {
    const assignment = await this.assignmentsRepository.findOne({
      where: { userId, taskId },
    });

    if (!assignment) throw new NotFoundError('Associação não encontrada');

    return AssignmentsTypeORMMapper.toEntity(assignment);
  }

  async findManyByTaskId(taskId: string): Promise<Assignment[]> {
    const assignments = await this.assignmentsRepository.find({
      where: { taskId },
      order: { assignedAt: 'desc' },
      relations: { user: true },
    });

    return assignments.map((assignment) =>
      AssignmentsTypeORMMapper.toEntity(assignment),
    );
  }

  async insert(entity: Assignment): Promise<void> {
    await this.assignmentsRepository.save(
      AssignmentsTypeORMMapper.toORM(entity),
    );
  }
}
