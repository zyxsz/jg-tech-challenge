import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { TaskEntity } from "../entities/task.entity";
import { Pagination } from "@/shared/pagination";

export class GetTasksWithPaginationMessageInput {
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

export class GetTasksWithPaginationMessageOutput {
  public data: TaskEntity[];
  public pagination: Pagination;
}
