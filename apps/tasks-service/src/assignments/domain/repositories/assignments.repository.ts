import { Assignment } from '../entities/assignment.entity';

export abstract class AssignmentsRepository {
  abstract insert(entity: Assignment): Promise<void>;
  abstract findManyByTaskId(taskId: string): Promise<Assignment[]>;
}
