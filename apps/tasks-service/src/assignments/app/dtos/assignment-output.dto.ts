import { Assignment } from '@/assignments/domain/entities/assignment.entity';

export interface AssignmentOutput {
  id: string;
  userId: string;
  taskId: string;
  assignedAt: Date;
  relations?: {
    user?: {
      id: string;
      username: string;
      email: string;
    };
  };
}

export class AssignmentOutputMapper {
  static toOutput(entity: Assignment) {
    return {
      id: entity.id,
      userId: entity.userId,
      assignedAt: entity.assignedAt,
      taskId: entity.taskId,
      relations: entity.relations
        ? {
            user: entity.relations.user
              ? {
                  id: entity.relations.user.id,
                  username: entity.relations.user.username,
                  email: entity.relations.user.email,
                }
              : undefined,
          }
        : undefined,
    } satisfies AssignmentOutput;
  }
}
