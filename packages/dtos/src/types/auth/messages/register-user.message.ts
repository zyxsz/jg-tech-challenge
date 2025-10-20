import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { ResponseTokens } from "../response-tokens";

export class RegisterUserMessageInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(2, 32)
  username: string;

  @IsNotEmpty()
  @Length(5, 128)
  password: string;
}

export class RegisterUserMessageOutput extends ResponseTokens {}
