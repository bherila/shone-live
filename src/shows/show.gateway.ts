import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { Logger } from '@nestjs/common';

// here follow what was set up in chats to make the show part work
@WebSocketGateway(3002, {
  namespace: '/show',
  path: '/websockets', // defaults to socket.io if you don't specify
  serveClient: true, // if the client app comes from another server, then false
})
export class ShowGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private logger: Logger = new Logger('ShowGateway');

  @WebSocketServer() wss: Server;
  // todo: fine to have in memory but should also log in the DB (create entity)
  users: number = 0;

  afterInit(server: Server) {
    this.logger.log('initialized');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    // A client has connected
    this.logger.log(`Client connected ${client.id}`);
    this.users++;

    // Notify connected clients of current users
    this.wss.emit('userCount', this.users);
  }

  async handleDisconnect(client: Socket) {
    // A client has disconnected
    this.logger.log(`Client disconnected ${client.id}`);
    this.users--;

    // Notify connected clients of current users
    this.wss.emit('userCount', this.users);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
    this.logger.log(`Client joined room ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
    this.logger.log(`Client left room ${room}`);
  }

  // add function to emit event for each sale, all the data should be there
  // this should only be accesible to the seller, they need a specially chanel
  // inventory updates should be emitted to all users however
  // for the seller channel for now it can just be their ID+SHOW-ID that's secure enough
  // the seller gets the full detail of the sale, all other users just get an inventory update push

}
