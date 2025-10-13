import { TasksServiceTypes } from "@repo/microservices";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Length, Max, Min } from "class-validator";

export class GetCommentsWithPaginationDto
  implements TasksServiceTypes.Comments.GetCommentWithPaginationInput
{
  @IsNotEmpty()
  taskId: string;

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

export class GetCommentsWithPaginationQueryDto {
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
