import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { type TasksServiceTypes } from "../../types/tasks-service.types";

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
    @ApiSchema({ name: "GetCommentsWithPaginationParamsDTO" })
    export class Params {
      @Type(() => Number)
      @IsNotEmpty()
      @Min(1)
      @IsNumber()
      @ApiProperty({
        example: "1",
        description: "Número da página",
        minimum: 1,
      })
      page: number;

      @Type(() => Number)
      @IsNotEmpty()
      @IsNumber()
      @Min(5)
      @Max(100)
      @ApiProperty({
        example: "10",
        description: "Limite de resultados por pagina",
        minimum: 5,
        maximum: 100,
      })
      limitPerPage: number;
    }
  }

  export namespace Microservice {
    export class Payload extends GetCommentsWithPaginationDTOInput {}
  }
}
