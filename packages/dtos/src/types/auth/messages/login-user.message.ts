import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { ResponseTokens } from "../response-tokens";

export class LoginUserMessageInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 128)
  password: string;
}

export class LoginUserMessageOutput extends ResponseTokens {}
