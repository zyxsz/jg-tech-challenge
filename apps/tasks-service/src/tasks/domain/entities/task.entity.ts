import { Entity } from '@repo/shared/domain';
import { Optional } from '@repo/shared/types';

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

  public set title(v) {
    this.props.title = v;
  }
  public set description(v) {
    this.props.description = v;
  }
  public set priority(v) {
    this.props.priority = v;
  }
  public set status(v) {
    this.props.status = v;
  }
  public set term(v) {
    this.props.term = v;
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
