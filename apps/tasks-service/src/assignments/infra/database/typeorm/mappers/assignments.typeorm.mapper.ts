import { Assignment } from '@/assignments/domain/entities/assignment.entity';
import { AssignmentEntity } from '../entities/assignment.typeorm.entity';
import { UsersTypeORMMapper } from '@/users/infra/database/typeorm/mappers/users.typeorm.mapper';

export class AssignmentsTypeORMMapper {
  static toEntity(entity: AssignmentEntity) {
    return Assignment.create(
      {
        taskId: entity.taskId,
        userId: entity.userId,
        assignedAt: entity.assignedAt,
      },
      entity.id,
      {
        user: entity.user
          ? UsersTypeORMMapper.toEntity(entity.user)
          : undefined,
      },
    );
  }

  static toORM(assignment: Assignment) {
    return {
      id: assignment.id,
      userId: assignment.userId,
      taskId: assignment.taskId,
      assignedAt: assignment.assignedAt,
    };
  }
}
