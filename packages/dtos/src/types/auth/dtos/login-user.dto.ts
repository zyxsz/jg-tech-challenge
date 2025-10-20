import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

@ApiSchema({ name: "LoginDTO" })
export class LoginUserBodyDTO {
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
