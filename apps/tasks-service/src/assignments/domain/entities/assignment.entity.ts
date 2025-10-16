import { Entity } from '@repo/shared/domain';
import { Optional } from '@repo/shared/types';
import { randomUUID } from 'node:crypto';

export interface AssignmentProps {
  userId: string;
  taskId: string;
  assignedAt: Date;
}

export class Assignment extends Entity<AssignmentProps, {}> {
  public get userId() {
    return this.props.userId;
  }
  public get taskId() {
    return this.props.taskId;
  }
  public get assignedAt() {
    return this.props.assignedAt;
  }

  static create(props: Optional<AssignmentProps, 'assignedAt'>, id?: string) {
    return new Assignment(
      { ...props, assignedAt: props.assignedAt ?? new Date() },
      id ?? randomUUID(),
    );
  }
}
