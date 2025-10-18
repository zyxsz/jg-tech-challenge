import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { type TasksServiceTypes } from "../../types/tasks-service.types";

import { IsNotEmpty } from "class-validator";

export class GetAssignmentsPayloadDto
  implements TasksServiceTypes.Assignments.GetAssignmentsInput
{
  @IsNotEmpty()
  taskId: string;
}
export class GetAssignmentsParamsDto
  implements TasksServiceTypes.Assignments.GetAssignmentsInput
{
  @IsNotEmpty()
  taskId: string;
}

export namespace GetAssignmentsDTO {
  export namespace Http {
    @ApiSchema({ name: "GetAssignmentsParamsDTO" })
    export class Params
      implements TasksServiceTypes.Assignments.GetAssignmentsInput
    {
      @IsNotEmpty()
      @ApiProperty({
        description: "Id da tarefa",
      })
      taskId: string;
    }
  }
  export namespace Microservice {
    export class Payload
      implements TasksServiceTypes.Assignments.GetAssignmentsInput
    {
      @IsNotEmpty()
      taskId: string;
    }
  }
}
