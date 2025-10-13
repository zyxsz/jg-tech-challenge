import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/infra/tasks.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TasksModule],
  providers: [],
})
export class AppModule {}
