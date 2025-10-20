import { IsNotEmpty } from "class-validator";

export class ValidateTokenDTO {
  @IsNotEmpty()
  accessToken: string;
}
