import { randomUUID } from 'node:crypto';
import { Entity } from '@repo/shared/domain';
import { Optional } from '@repo/shared/types';

export interface UserProps {
  username: string;
  email: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
}

export class User extends Entity<UserProps, {}> {
  public get username() {
    return this.props.username;
  }
  public get email() {
    return this.props.email;
  }
  public get password() {
    return this.props.password;
  }
  public get updatedAt() {
    return this.props.updatedAt;
  }
  public get createdAt() {
    return this.props.createdAt;
  }

  public set updatedAt(v) {
    this.props.updatedAt = v;
  }

  public set username(v) {
    if (this.props.username !== v) this.updatedAt = new Date();
    this.props.username = v;
  }

  public set email(v) {
    if (this.props.email !== v) this.updatedAt = new Date();
    this.props.email = v;
  }

  public set password(v) {
    if (this.props.password !== v) this.updatedAt = new Date();
    this.props.password = v;
  }

  static create(
    props: Optional<UserProps, 'updatedAt' | 'createdAt'>,
    id?: string,
  ) {
    return new User(
      {
        ...props,
        updatedAt: props.updatedAt ?? new Date(),
        createdAt: props.createdAt ?? new Date(),
      },
      id ?? randomUUID(),
    );
  }
}
