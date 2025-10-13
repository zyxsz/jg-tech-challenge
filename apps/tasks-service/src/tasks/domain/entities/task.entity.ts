import { Entity, Optional } from '@repo/microservices';
import { randomUUID } from 'node:crypto';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface TaskProps {
  authorId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  term: Date;
  createdAt: Date;
}

export class Task extends Entity<TaskProps> {
  public get authorId() {
    return this.props.authorId;
  }
  public get title() {
    return this.props.title;
  }
  public get description() {
    return this.props.description;
  }
  public get priority() {
    return this.props.priority;
  }
  public get status() {
    return this.props.status;
  }
  public get term() {
    return this.props.term;
  }
  public get createdAt() {
    return this.props.createdAt;
  }

  static create(props: Optional<TaskProps, 'createdAt'>, id?: string) {
    return new Task(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id ?? randomUUID(),
    );
  }
}
