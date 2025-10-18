import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from './auth/auth.service';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationCreatedEventDTO } from './events/dtos/notification-created-event.dto';

@WebSocketGateway(3335, { cors: true })
export class NotificationsGateway {
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
    console.log(response);

    if (!response.isValid) {
      client.emit('error', {
        success: false,
        message: 'Unable to authenticate user',
      });

      return;
    }

    client.emit('authenticated', {
      success: true,
      message: 'User authenticated successfully',
    });

    client.join(`users:${response.user.id}`);
  }

  @OnEvent('notification:created')
  async handleNotificationCreated(payload: NotificationCreatedEventDTO) {
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
