import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './notifications/notifications.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({ global: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    NotificationsModule,
    WebsocketModule,
  ],
})
export class AppModule {}
