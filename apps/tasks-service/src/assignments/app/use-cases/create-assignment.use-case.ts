import { Assignment } from '@/assignments/domain/entities/assignment.entity';
import { AssignmentsRepository } from '@/assignments/domain/repositories/assignments.repository';
import {
  AssignmentOutput,
  AssignmentOutputMapper,
} from '../dtos/assignment-output.dto';

export interface CreateAssignmentUseCaseInput {
  userId: string;
  taskId: string;
}

export interface CreateAssignmentUseCaseOutput extends AssignmentOutput {}

export class CreateAssignmentUseCase {
  constructor(private assignmentsRepository: AssignmentsRepository) {}

  async execute(
    input: CreateAssignmentUseCaseInput,
  ): Promise<CreateAssignmentUseCaseOutput> {
    const assignment = Assignment.create({
      taskId: input.taskId,
      userId: input.userId,
    });

    await this.assignmentsRepository.insert(assignment);

    return AssignmentOutputMapper.toOutput(assignment);
  }
}
