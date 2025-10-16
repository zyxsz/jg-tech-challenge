import { TasksServiceTypes } from "@repo/microservices";
import { IsNotEmpty } from "class-validator";

export class DeleteTaskDTOInput implements TasksServiceTypes.DeleteTaskInput {
  @IsNotEmpty()
  taskId: string;
}

export namespace DeleteTaskDTO {
  export namespace Http {
    export class Params extends DeleteTaskDTOInput {}
  }

  export namespace Microservice {
    export class Payload extends DeleteTaskDTOInput {}
  }
}
