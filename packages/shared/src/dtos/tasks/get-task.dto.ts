import { TasksServiceTypes } from "@repo/microservices";
import { IsNotEmpty } from "class-validator";

export class GetTaskDto implements TasksServiceTypes.GetTaskInput {
  @IsNotEmpty()
  taskId: string;
}
