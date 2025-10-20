import { IsNotEmpty } from "class-validator";
import { AssignmentEntity } from "../entities/assignment.entity";

export class CreateAssignmentMessageInput {
  @IsNotEmpty()
  taskId: string;

  @IsNotEmpty()
  userId: string;
}

export class CreateAssignmentMessageOutput {
  assignment: AssignmentEntity;
}
