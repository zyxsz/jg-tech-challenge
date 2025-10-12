import { AuthServiceTypes } from '@repo/microservices';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto implements AuthServiceTypes.LoginUserInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 128)
  password: string;
}
