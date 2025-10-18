import { Assignment } from '../entities/assignment.entity';

export abstract class AssignmentsRepository {
  abstract insert(entity: Assignment): Promise<void>;
  abstract findManyByTaskId(taskId: string): Promise<Assignment[]>;
  abstract findByUserIdAndTaskId(
    userId: string,
    taskId: string,
  ): Promise<Assignment>;
}
