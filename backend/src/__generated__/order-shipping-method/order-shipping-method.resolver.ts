/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<vl2K3MIHxTIe0e8ojzvV+vsfxGMKkIuP>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { OrderShippingMethodsService } from './order-shipping-method.service'
import { OrderShippingMethod } from './order-shipping-method.entity'

@Resolver(() => OrderShippingMethod)
export class OrderShippingMethodsResolver {
  constructor(
    private readonly OrderShippingMethodsService: OrderShippingMethodsService,
  ) {}

  @Query(() => OrderShippingMethod, { nullable: true })
  orderShippingMethodEntId(
    @Args('orderShippingMethodEntId')
    orderShippingMethodEntId: string /* UUID */,
  ) {
    return this.OrderShippingMethodsService.getByEntId(orderShippingMethodEntId)
  }

  @Query(() => [OrderShippingMethod])
  orderShippingMethods(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<OrderShippingMethod[]> {
    return this.OrderShippingMethodsService.findAll(paginationQuery)
  }

  // @Mutation(() => OrderShippingMethod)
  // async addOrderShippingMethod(@Args('email') email: string) {
  //   return await this.OrderShippingMethodsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
