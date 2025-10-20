import { IsNotEmpty } from "class-validator";
import { UserEntity } from "../entities/user.entity";

export class ValidateTokenMessageInput {
  @IsNotEmpty()
  accessToken: string;
}

export class ValidateTokenMessageOutput {
  user: UserEntity | null;
  isValid: boolean;
}
