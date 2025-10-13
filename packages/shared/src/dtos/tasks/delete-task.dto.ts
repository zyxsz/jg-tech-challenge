import { TasksServiceTypes } from "@repo/microservices";
import { IsNotEmpty } from "class-validator";

export class DeleteTaskDto implements TasksServiceTypes.DeleteTaskInput {
  @IsNotEmpty()
  taskId: string;
}
