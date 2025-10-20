import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { CommentEntity } from "../entities/comment.entity";
import { Pagination } from "@/shared/pagination";

export class GetCommentsWithPaginationMessageInput {
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

export class GetCommentsWithPaginationMessageOutput {
  data: CommentEntity[];
  pagination: Pagination;
}
