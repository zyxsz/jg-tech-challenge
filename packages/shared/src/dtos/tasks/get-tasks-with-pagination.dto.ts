import { TasksServiceTypes } from "@repo/microservices";
import { IsNotEmpty, Max, Min } from "class-validator";

export class GetTasksWithPaginationDto
  implements TasksServiceTypes.GetTasksWithPaginationInput
{
  @IsNotEmpty()
  @Min(1)
  page: number;

  @IsNotEmpty()
  @Min(5)
  @Max(100)
  limitPerPage: number;
}
