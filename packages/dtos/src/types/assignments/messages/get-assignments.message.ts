import { IsNotEmpty } from "class-validator";
import { AssignmentEntity } from "../entities/assignment.entity";

export class GetAssignmentsMessageInput {
  @IsNotEmpty()
  taskId: string;
}

export class GetAssignmentsMessageOutput {
  assignments: AssignmentEntity[];
}
