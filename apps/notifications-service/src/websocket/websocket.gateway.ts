import { Inject, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway as NestWebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthService } from '@/auth/auth.service';
import { NotificationCreatedEvent } from '@/events/notification-created.event';

@NestWebSocketGateway(3335, { cors: true })
export class WebSocketGateway {
  private readonly logger = new Logger('WebSocketGateway');

  @Inject()
  private authService: AuthService;

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('authenticate')
  async handleAuthenticate(
    @MessageBody() body: { accessToken: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (!body.accessToken) return;

    const response = await this.authService.validateToken({
      accessToken: body.accessToken,
    });

    if (!response.isValid) {
      this.logger.log(`Failed to authenticate user`);

      client.emit('authenticated', {
        success: false,
        message: 'Unable to authenticate user',
      });

      return;
    }

    this.logger.log(
      `User "${response.user.username}" autenticated successfully`,
    );

    client.emit('authenticated', {
      success: true,
      message: 'User authenticated successfully',
    });

    await client.join(`users:${response.user.id}`);
  }

  @OnEvent('notification:created')
  handleNotificationCreated(payload: NotificationCreatedEvent) {
    this.logger.log(`Emitting event "notification:created"`);

    if (payload.targetId) {
      this.server.to(payload.targetId).emit('notification:created', {
        title: payload.title,
        content: payload.content,
      });
    } else {
      this.server.emit('notification:created', {
        title: payload.title,
        content: payload.content,
      });
    }
  }
}
