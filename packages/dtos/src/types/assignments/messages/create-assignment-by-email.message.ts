import { IsNotEmpty } from "class-validator";
import { AssignmentEntity } from "../entities/assignment.entity";

export class CreateAssignmentByEmailMessageInput {
  @IsNotEmpty()
  taskId: string;

  @IsNotEmpty()
  userEmail: string;
}

export class CreateAssignmentByEmailMessageOutput {
  assignment: AssignmentEntity;
}
