import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

@ApiSchema({ name: "RefreshTokenBodyDTO" })
export class RefreshTokenBodyDTO {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
    description: "Token JWT",
  })
  @IsNotEmpty()
  refreshToken: string;
}
