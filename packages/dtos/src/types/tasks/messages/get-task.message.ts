import { IsNotEmpty } from "class-validator";
import { TaskEntity } from "../entities/task.entity";

export class GetTaskMessageInput {
  @IsNotEmpty()
  public taskId: string;
}

export class GetTaskMessageOutput {
  public task: TaskEntity;
}
