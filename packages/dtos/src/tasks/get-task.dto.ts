import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { type TasksServiceTypes } from "../types/tasks-service.types";

import { IsNotEmpty } from "class-validator";

class GetTaskDTOInput implements TasksServiceTypes.GetTaskInput {
  @IsNotEmpty()
  @ApiProperty({
    description: "Id da tarefa",
  })
  taskId: string;
}

export namespace GetTaskDTO {
  export namespace Http {
    @ApiSchema({
      name: "GetTaskDTOParams",
    })
    export class Params extends GetTaskDTOInput {}
  }

  export namespace Microservice {
    export class Payload extends GetTaskDTOInput {}
  }
}
