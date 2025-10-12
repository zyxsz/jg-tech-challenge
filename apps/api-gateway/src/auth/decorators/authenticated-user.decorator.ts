import { UserType } from '@/shared/types/user';
import { createParamDecorator } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();

  return request['user'] as UserType;
});
