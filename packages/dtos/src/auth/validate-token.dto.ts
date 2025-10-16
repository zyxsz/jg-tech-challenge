import { IsNotEmpty } from "class-validator";

class ValidateTokenInput {
  @IsNotEmpty()
  accessToken: string;
}

export namespace ValidateTokenDTO {
  export namespace Microservice {
    export class Payload extends ValidateTokenInput {}
  }
}
