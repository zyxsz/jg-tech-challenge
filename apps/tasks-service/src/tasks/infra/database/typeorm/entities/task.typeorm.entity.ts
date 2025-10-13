import {
  type TaskStatus,
  type TaskPriority,
} from '@/tasks/domain/entities/task.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @Index()
  authorId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
  })
  priority: TaskPriority;

  @Column({
    type: 'enum',
    enum: ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'],
  })
  status: TaskStatus;

  @Column()
  term: Date;

  @CreateDateColumn()
  createdAt: Date;
}
