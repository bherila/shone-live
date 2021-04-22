/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<lGY2R2+tisr4D+l5ecjthLUJifu0Pk2P>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Order } from './order.entity'
import { OrdersService } from './order.service'

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly OrdersService: OrdersService) {}

  @Query(() => Order, { nullable: true })
  orderEntId(@Args('orderEntId') orderEntId: string /* UUID */) {
    return this.OrdersService.getByEntId(orderEntId)
  }

  @Query(() => [Order])
  orders(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Order[]> {
    return this.OrdersService.findAll(paginationQuery)
  }

  // @Mutation(() => Order)
  // async addOrder(@Args('email') email: string) {
  //   return await this.OrdersService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
