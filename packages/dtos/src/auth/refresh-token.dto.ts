import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

class RefreshTokenInput {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
    description: "Token JWT",
  })
  @IsNotEmpty()
  refreshToken: string;
}

export namespace RefreshTokenDTO {
  export namespace Http {
    @ApiSchema({ name: "RefreshTokenDTO" })
    export class Body extends RefreshTokenInput {}
  }
  export namespace Microservice {
    export class Payload extends RefreshTokenInput {}
  }
}
