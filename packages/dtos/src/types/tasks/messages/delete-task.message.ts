import { IsNotEmpty } from "class-validator";

export class DeleteTaskMessageInput {
  @IsNotEmpty()
  public taskId: string;
}

export class DeleteTaskMessageOutput {
  success: boolean;
}
