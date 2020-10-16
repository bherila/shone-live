import { Server } from 'socket.io';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(3002, {
  namespace: '/alert',
  path: '/websockets', // defaults to socket.io if you don't specify
  serveClient: true, // if the client app comes from another server, then false
})
export class AlertGateway {
  @WebSocketServer() wss: Server;

  sendToAll(msg: string) {
    this.wss.emit('alertSentToClient', { type: 'alert', message: msg });
  }
}
