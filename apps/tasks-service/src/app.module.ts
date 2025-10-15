import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/infra/tasks.module';
import { CommentsModule } from './comments/infra/comments.module';
import { UsersModule } from './users/infra/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    CommentsModule,
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
