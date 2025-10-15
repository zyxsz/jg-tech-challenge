import { UserEntity } from '../../../../../users/infra/database/typeorm/entities/users.typeorm.entity';
import { TaskEntity } from '../../../../../tasks/infra/database/typeorm/entities/task.typeorm.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  authorId: string;

  @ManyToOne(() => TaskEntity, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: TaskEntity;

  @Column()
  taskId: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: UserEntity;
}
