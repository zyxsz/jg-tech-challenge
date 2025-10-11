import { AuthServiceTypes } from '@repo/microservices';
import { IsNotEmpty } from 'class-validator';

export class ValidateTokenDto implements AuthServiceTypes.ValidateTokenInput {
  @IsNotEmpty()
  accessToken: string;
}
