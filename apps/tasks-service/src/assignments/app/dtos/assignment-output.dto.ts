import { Assignment } from '@/assignments/domain/entities/assignment.entity';

export interface AssignmentOutput {
  id: string;
  userId: string;
  taskId: string;
  assignedAt: Date;
}

export class AssignmentOutputMapper {
  static toOutput(entity: Assignment) {
    return {
      id: entity.id,
      userId: entity.userId,
      assignedAt: entity.assignedAt,
      taskId: entity.taskId,
    } satisfies AssignmentOutput;
  }
}
