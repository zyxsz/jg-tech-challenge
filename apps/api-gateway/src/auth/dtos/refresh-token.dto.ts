import { AuthServiceTypes } from '@repo/microservices';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto implements AuthServiceTypes.RefreshTokenInput {
  @IsNotEmpty()
  refreshToken: string;
}
