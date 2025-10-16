import { TasksServiceTypes } from "@repo/microservices";
import { IsNotEmpty } from "class-validator";

class GetTaskDTOInput implements TasksServiceTypes.GetTaskInput {
  @IsNotEmpty()
  taskId: string;
}

export namespace GetTaskDTO {
  export namespace Http {
    export class Params extends GetTaskDTOInput {}
  }

  export namespace Microservice {
    export class Payload extends GetTaskDTOInput {}
  }
}
