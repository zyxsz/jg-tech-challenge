import { AuditLogEntity } from '../../../../../audit-logs/infra/database/typeorm/entities/audit-log.typeorm.entity';
import { CommentEntity } from '../../../../../comments/infra/database/typeorm/entities/comment.typeorm.entity';
import { TaskEntity } from '../../../../../tasks/infra/database/typeorm/entities/task.typeorm.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users_tasks_service' })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments: CommentEntity[];

  @OneToMany(() => TaskEntity, (task) => task.author)
  tasks: TaskEntity[];

  @OneToMany(() => AuditLogEntity, (log) => log.author)
  auditLogs: AuditLogEntity[];
}
