import { ShowGateway } from 'src/shows/show.gateway';

import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersQueryDto } from './dto/orders-query.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly showGateway: ShowGateway,
  ) {}

  @Get()
  async findAll(@Query() getOrderDto: OrdersQueryDto) {
    return this.ordersService.findAll(getOrderDto);
  }

  // create
  // unclear how we do the checkout if we do the order creation and checkout totally from the client or also from the server and what the mix is
  // pay
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    this.showGateway.wss
      .to(`${order.show.id}`)
      .emit('order', { type: 'alert', message: order }); // type only set to alert for use with VueSimpleNotify in testing, not needed for react app
    return order;
  }
}
