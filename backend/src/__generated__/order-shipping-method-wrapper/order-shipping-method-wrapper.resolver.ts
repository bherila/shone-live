/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<sX3yDOfPg7v5AyH0uZHvjpKCsn7IzrfW>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { OrderShippingMethodWrappersService } from './order-shipping-method-wrapper.service'
import { OrderShippingMethodWrapper } from './order-shipping-method-wrapper.entity'

@Resolver(() => OrderShippingMethodWrapper)
export class OrderShippingMethodWrappersResolver {
  constructor(
    private readonly OrderShippingMethodWrappersService: OrderShippingMethodWrappersService,
  ) {}

  @Query(() => OrderShippingMethodWrapper, { nullable: true })
  orderShippingMethodWrapperEntId(
    @Args('orderShippingMethodWrapperEntId')
    orderShippingMethodWrapperEntId: string /* UUID */,
  ) {
    return this.OrderShippingMethodWrappersService.getByEntId(
      orderShippingMethodWrapperEntId,
    )
  }

  @Query(() => [OrderShippingMethodWrapper])
  orderShippingMethodWrappers(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<OrderShippingMethodWrapper[]> {
    return this.OrderShippingMethodWrappersService.findAll(paginationQuery)
  }

  // @Mutation(() => OrderShippingMethodWrapper)
  // async addOrderShippingMethodWrapper(@Args('email') email: string) {
  //   return await this.OrderShippingMethodWrappersService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
