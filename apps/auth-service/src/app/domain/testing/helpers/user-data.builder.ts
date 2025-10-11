import type { UserProps } from '../../entities/user.entity';
import { faker } from '@faker-js/faker';

export class UserDataBuilder {
  static build(props?: Partial<UserProps>) {
    return {
      email: faker.internet.email(),
      username: faker.person.firstName(),
      password: faker.internet.password(),
      updatedAt: new Date(),
      createdAt: new Date(),
      ...props,
    } satisfies UserProps;
  }
}
