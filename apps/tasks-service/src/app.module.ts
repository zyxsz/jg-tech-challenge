import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/infra/tasks.module';
import { CommentsModule } from './comments/infra/comments.module';
import { UsersModule } from './users/infra/users.module';
import { AssignmentsModule } from './assignments/infra/assignments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    CommentsModule,
    UsersModule,
    AssignmentsModule,
  ],
  providers: [],
})
export class AppModule {}
