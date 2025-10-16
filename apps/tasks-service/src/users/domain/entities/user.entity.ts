import { Entity } from '@repo/shared/domain';

export interface UserProps {
  username: string;
  email: string;
}

export class User extends Entity<UserProps, {}> {
  public get username() {
    return this.props.username;
  }

  public get email() {
    return this.props.email;
  }

  static create(props: UserProps, id: string) {
    return new User(props, id);
  }
}
