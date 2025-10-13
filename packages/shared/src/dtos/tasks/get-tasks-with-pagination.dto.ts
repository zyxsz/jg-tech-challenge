import { TasksServiceTypes } from "@repo/microservices";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class GetTasksWithPaginationDto
  implements TasksServiceTypes.GetTasksWithPaginationInput
{
  @Type(() => Number)
  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  @Max(100)
  limitPerPage: number;
}
