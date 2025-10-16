import { TasksServiceTypes } from "@repo/microservices";
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
    export class Params
      implements TasksServiceTypes.Assignments.GetAssignmentsInput
    {
      @IsNotEmpty()
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
