import { Body, Controller, Get, HttpStatus, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ShowGateway } from "../shows/show.gateway";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersQueryDto } from "./dto/orders-query.dto";
import { Order } from "./entities/order.entity";
import { OrdersService } from "./orders.service";

@ApiTags("orders")
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('JWT')
@Controller("orders")
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly showGateway: ShowGateway
  ) {}

  @ApiOperation({ summary: `returns all orders filtered by the query params` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `returns all orders`,
    type: Order,
    isArray: true
  })
  @ApiQuery({ name: "show_id", type: String, required: false })
  @ApiQuery({ name: "offset", type: Number, required: false })
  @ApiQuery({ name: "limit", type: Number, required: false })
  @Get()
  async findAll(@Query() getOrderDto: OrdersQueryDto): Promise<Order[]> {
    return this.ordersService.findAll(getOrderDto);
  }

  @ApiOperation({
    summary: `creates an order in stripe
  and then pays the order so it gets completed
  on successful order processing returns the order
  (if units in stock, payment valid, eventually address validation included)`
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `created an order`,
    type: Order
  })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.ordersService.create(createOrderDto);
    this.showGateway.wss
      .to(`${order.show.id}`)
      .emit("order", { type: "alert", message: order }); // type only set to alert for use with VueSimpleNotify in testing, not needed for react app
    return order;
  }
}
