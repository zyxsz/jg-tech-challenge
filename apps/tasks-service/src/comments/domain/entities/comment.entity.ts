import { Entity } from '@repo/microservices';
import { Optional } from '@repo/shared/types';
import { randomUUID } from 'node:crypto';

export interface CommentProps {
  authorId: string;
  taskId: string;
  content: string;
  createdAt: Date;
}

export class Comment extends Entity<CommentProps> {
  public get authorId() {
    return this.props.authorId;
  }
  public get taskId() {
    return this.props.taskId;
  }
  public get content() {
    return this.props.content;
  }
  public get createdAt() {
    return this.props.createdAt;
  }

  static create(props: Optional<CommentProps, 'createdAt'>, id?: string) {
    return new Comment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id ?? randomUUID(),
    );
  }
}
