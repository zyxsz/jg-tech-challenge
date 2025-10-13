import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/infra/tasks.module';
import { CommentsModule } from './comments/infra/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    CommentsModule,
  ],
  providers: [],
})
export class AppModule {}
