import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

class LoginInput {
  @IsEmail()
  @ApiProperty({
    example: "example@email.com",
    description: "Email do usuário",
  })
  email: string;

  @IsNotEmpty()
  @Length(5, 128)
  @ApiProperty({
    example: "******",
    description: "Senha do usuário",
  })
  password: string;
}

export namespace LoginUserDTO {
  export namespace Http {
    @ApiSchema({ name: "LoginDTO" })
    export class Body extends LoginInput {}
  }

  export namespace Microservice {
    export class Payload extends LoginInput {}
  }
}
