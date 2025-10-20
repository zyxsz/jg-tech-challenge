import { IsNotEmpty } from "class-validator";

export class CreateAssignmentBodyDTO {
  @IsNotEmpty()
  taskId: string;

  @IsNotEmpty()
  userId: string;
}
