import { TasksServiceTypes } from "@repo/microservices";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

class GetTasksWithPaginationDTOInput
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

export namespace GetTasksWithPaginationDTO {
  export namespace Http {
    export class QueryParams extends GetTasksWithPaginationDTOInput {}
  }

  export namespace Microservice {
    export class Payload extends GetTasksWithPaginationDTOInput {}
  }
}
