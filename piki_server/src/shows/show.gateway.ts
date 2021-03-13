import { Server, Socket } from 'socket.io';

import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';

import {
  SimpleProductSaleResponse,
} from '../simple-products/responses/simple-product-sale.response';

// here follow what was set up in chats to make the show part work
@WebSocketGateway({ namespace: '/show' })
export class ShowGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private logger: Logger = new Logger('ShowGateway');

  @WebSocketServer() wss: Server;
  // todo: fine to have in memory but should also log in the DB (create entity)
  users = 0;

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

  handleShowSales(simpleProductSaleResponse: SimpleProductSaleResponse) {
    const { showId, simpleProductId, quantityLeft } = simpleProductSaleResponse;
    const data = {
      simple_product_id: simpleProductId,
      quantity_left: quantityLeft,
    };
    console.log(`this.wss.to(${showId}).emit('sale', ${data});`);
    this.wss.to(showId).emit('sale', data);
  }
}
