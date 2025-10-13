import { TaskEntity } from '../../../../../tasks/infra/database/typeorm/entities/task.typeorm.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @Index()
  authorId: string;

  @ManyToOne(() => TaskEntity, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: TaskEntity;

  taskId: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
