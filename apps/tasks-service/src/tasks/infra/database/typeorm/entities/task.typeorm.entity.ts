import { AuditLogEntity } from '../../../../../audit-logs/infra/database/typeorm/entities/audit-log.typeorm.entity';
import { CommentEntity } from '../../../../../comments/infra/database/typeorm/entities/comment.typeorm.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  OneToMany,
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
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

  @Column({
    type: 'enum',
    enum: ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'],
  })
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

  @Column()
  term: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CommentEntity, (comment) => comment.task)
  comments: CommentEntity[];

  @OneToMany(() => AuditLogEntity, (log) => log.task)
  auditLogs: AuditLogEntity[];
}
