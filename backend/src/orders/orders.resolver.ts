import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CreateorderDto } from './dto/create-order.dto'
import { UpdateorderDto } from './dto/update-order.dto'
import { Order } from './entities/order.entity'
import { OrdersService } from './orders.service'

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => Order, { nullable: true })
  order(@Args('orderId') orderId: string) {
    return this.ordersService.findOne(orderId)
  }

  @Query(() => [Order])
  orders(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Order[]> {
    return this.ordersService.findAll(paginationQuery)
  }

  @Query(() => [Order])
  @UseGuards(new AuthGuard())
  myOrders(
    @Context('user') user,
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Order[]> {
    return this.ordersService.findByUser(paginationQuery, user.id)
  }

  @Mutation(() => Order)
  @UseGuards(new AuthGuard())
  async addOrder(@Context('user') user, @Args('data') data: CreateorderDto) {
    return await this.ordersService.create(data, user.id)
  }

  @Mutation(() => Order)
  @UseGuards(new AuthGuard())
  async updateOrder(@Args('data') data: UpdateorderDto) {
    return await this.ordersService.update(data)
  }
}
