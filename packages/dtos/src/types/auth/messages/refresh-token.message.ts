import { IsNotEmpty } from "class-validator";
import { ResponseTokens } from "../response-tokens";

export class RefreshTokenMessageInput {
  @IsNotEmpty()
  refreshToken: string;
}

export class RefreshTokenMessageOutput extends ResponseTokens {}
