import { TasksServiceTypes } from "@repo/microservices";
import { IsNotEmpty } from "class-validator";

export class CreateUserPayloadDto
  implements TasksServiceTypes.CreateUserEventPayload
{
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;
}
