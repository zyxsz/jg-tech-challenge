import { AuthServiceTypes } from '@repo/microservices';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterUserDto implements AuthServiceTypes.RegisterUserInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(2, 32)
  username: string;

  @IsNotEmpty()
  @Length(5, 128)
  password: string;
}
