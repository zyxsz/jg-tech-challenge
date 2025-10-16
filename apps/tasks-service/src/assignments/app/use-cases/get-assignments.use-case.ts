import { AssignmentsRepository } from '@/assignments/domain/repositories/assignments.repository';
import {
  AssignmentOutput,
  AssignmentOutputMapper,
} from '../dtos/assignment-output.dto';

export interface GetAssignmentsUseCaseInput {
  taskId: string;
}

export interface GetAssignmentsUseCaseOutput extends Array<AssignmentOutput> {}

export class GetAssignmentsUseCase {
  constructor(private assignmentsRepository: AssignmentsRepository) {}

  async execute(
    input: GetAssignmentsUseCaseInput,
  ): Promise<GetAssignmentsUseCaseOutput> {
    const assignments = await this.assignmentsRepository.findManyByTaskId(
      input.taskId,
    );

    return assignments.map((assignment) =>
      AssignmentOutputMapper.toOutput(assignment),
    );
  }
}
