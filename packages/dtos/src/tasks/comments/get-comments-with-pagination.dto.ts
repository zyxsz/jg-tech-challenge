import { TasksServiceTypes } from "@repo/microservices";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Length, Max, Min } from "class-validator";

class GetCommentsWithPaginationDTOInput
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

export namespace GetCommentsWithPaginationDTO {
  export namespace Http {
    export class Params {
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
  }

  export namespace Microservice {
    export class Payload extends GetCommentsWithPaginationDTOInput {}
  }
}
