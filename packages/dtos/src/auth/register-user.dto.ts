import { IsEmail, IsNotEmpty, Length } from "class-validator";

class RegisterInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(2, 32)
  username: string;

  @IsNotEmpty()
  @Length(5, 128)
  password: string;
}

export namespace RegisterUserDTO {
  export namespace Http {
    export class Body extends RegisterInput {}
  }

  export namespace Microservice {
    export class Payload extends RegisterInput {}
  }
}
