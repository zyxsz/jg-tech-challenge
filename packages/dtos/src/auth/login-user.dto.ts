import { IsEmail, IsNotEmpty, Length } from "class-validator";

class LoginInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 128)
  password: string;
}

export namespace LoginUserDTO {
  export namespace Http {
    export class Body extends LoginInput {}
  }

  export namespace Microservice {
    export class Payload extends LoginInput {}
  }
}
