import { type TasksServiceTypes } from "../../types/tasks-service.types";

import { IsNotEmpty } from "class-validator";

export class CreateAssignmentInput
  implements TasksServiceTypes.Assignments.CreateAssignmentInput
{
  @IsNotEmpty()
  taskId: string;

  @IsNotEmpty()
  userId: string;
}

export namespace CreateAssignmentDTO {
  export namespace Microservice {
    export class Payload extends CreateAssignmentInput {}
  }
}
