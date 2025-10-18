import { type TasksServiceTypes } from "../../types/tasks-service.types";

import { IsNotEmpty } from "class-validator";

class CreateUserPayloadInput
  implements TasksServiceTypes.CreateUserEventPayload
{
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;
}

export namespace CreateUserPayload {
  export namespace Microservice {
    export class Payload extends CreateUserPayloadInput {}
  }
}
