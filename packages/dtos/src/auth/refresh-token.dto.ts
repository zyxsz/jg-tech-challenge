import { IsNotEmpty } from "class-validator";

class RefreshTokenInput {
  @IsNotEmpty()
  refreshToken: string;
}

export namespace RefreshTokenDTO {
  export namespace Http {
    export class Body extends RefreshTokenInput {}
  }
  export namespace Microservice {
    export class Payload extends RefreshTokenInput {}
  }
}
