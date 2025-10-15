import { UserEntity } from '../../../../../users/infra/database/typeorm/entities/users.typeorm.entity';
import { TaskEntity } from '../../../../../tasks/infra/database/typeorm/entities/task.typeorm.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'audit_logs' })
export class AuditLogEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  authorId: string;

  @Column()
  taskId: string;

  @Column({
    type: 'enum',
    enum: ['UPDATE', 'CREATE'],
  })
  actionType: 'UPDATE' | 'CREATE';

  @Column({ type: 'json' })
  modifications: object;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => TaskEntity, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: TaskEntity;

  @ManyToOne(() => UserEntity, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: UserEntity;
}
