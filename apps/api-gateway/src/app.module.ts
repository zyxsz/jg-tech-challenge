import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './tasks/comments/comments.module';
import { AssignmentsController } from './tasks/assignments/assignments.controller';
import { AssignmentsModule } from './tasks/assignments/assignments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TasksModule,
    CommentsModule,
    AssignmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
