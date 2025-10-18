import { IsNotEmpty } from "class-validator";
import { type TasksServiceTypes } from "../types/tasks-service.types";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";

export class DeleteTaskDTOInput implements TasksServiceTypes.DeleteTaskInput {
  @IsNotEmpty()
  @ApiProperty({
    description: "Id da tarefa",
  })
  taskId: string;
}

export namespace DeleteTaskDTO {
  export namespace Http {
    @ApiSchema({ name: "DeleteTaskParamsDTO" })
    export class Params extends DeleteTaskDTOInput {}
  }

  export namespace Microservice {
    export class Payload extends DeleteTaskDTOInput {}
  }
}
