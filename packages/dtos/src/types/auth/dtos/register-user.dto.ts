import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

@ApiSchema({ name: "RegisterDTO" })
export class RegisterUserBodyDTO {
  @ApiProperty({
    example: "example@email.com",
    description: "Email",
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(2, 32)
  @ApiProperty({
    example: "John doe",
    description: "Nome de usuário",
  })
  username: string;

  @IsNotEmpty()
  @Length(5, 128)
  @ApiProperty({
    example: "*******",
    description: "Senha",
  })
  password: string;
}
