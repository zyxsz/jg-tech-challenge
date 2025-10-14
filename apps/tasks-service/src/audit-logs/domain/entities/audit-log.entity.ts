import { Entity } from '@repo/microservices';
import { Optional } from '@repo/shared/types';
import { randomUUID } from 'node:crypto';

export type AuditLogActionType = 'UPDATE' | 'CREATE';

export interface AuditLogProps {
  taskId: string;
  authorId: string;
  actionType: AuditLogActionType;
  modifications: object;
  createdAt: Date;
}

export class AuditLog extends Entity<AuditLogProps> {
  public get taskId() {
    return this.props.taskId;
  }
  public get authorId() {
    return this.props.authorId;
  }
  public get actionType() {
    return this.props.actionType;
  }
  public get modifications() {
    return this.props.modifications;
  }
  public get createdAt() {
    return this.props.createdAt;
  }

  static create(props: Optional<AuditLogProps, 'createdAt'>, id?: string) {
    return new AuditLog(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id ?? randomUUID(),
    );
  }
}
