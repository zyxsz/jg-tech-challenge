import { UserEntity } from '../../../../../users/infra/database/typeorm/entities/users.typeorm.entity';
import { TaskEntity } from '../../../../../tasks/infra/database/typeorm/entities/task.typeorm.entity';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'tasks_assignments' })
export class AssignmentEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserEntity, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: string;

  @ManyToOne(() => TaskEntity, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: TaskEntity;

  @Column()
  taskId: string;

  @Column({ type: 'date' })
  assignedAt: Date;
}
