import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { type TasksServiceTypes } from "../types/tasks-service.types";

import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

class GetTasksWithPaginationDTOInput
  implements TasksServiceTypes.GetTasksWithPaginationInput
{
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

export namespace GetTasksWithPaginationDTO {
  export namespace Http {
    @ApiSchema({ name: "GetTasksWithPaginationDTO" })
    export class QueryParams extends GetTasksWithPaginationDTOInput {}
  }

  export namespace Microservice {
    export class Payload extends GetTasksWithPaginationDTOInput {}
  }
}
