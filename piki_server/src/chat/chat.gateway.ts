import { Server, Socket } from 'socket.io';

import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';

// TODO add connections entity to save all the user with show, connected, disconnected
@WebSocketGateway(3002, {
  namespace: '/chat',
  path: '/websockets', // defaults to socket.io if you don't specify
  serveClient: true, // if the client app comes from another server, then false
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private logger: Logger = new Logger('ChatGateway');

  @WebSocketServer() wss: Server;
  users = 0;

  afterInit(server: Server) {
    this.logger.log('initialized');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    // A client has connected
    this.logger.log(`Client connected ${client.id}`);
    this.users++;

    // Notify connected clients of current users
    this.wss.emit('users', this.users);
  }

  async handleDisconnect(client: Socket) {
    // A client has disconnected
    this.logger.log(`Client disconnected ${client.id}`);
    this.users--;

    // Notify connected clients of current users
    this.wss.emit('users', this.users);
  }

  @SubscribeMessage('chatSentToServer')
  onChat(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ): void {
    this.wss.emit('chatSentToClient', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
