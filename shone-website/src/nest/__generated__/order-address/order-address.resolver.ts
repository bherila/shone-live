/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<</Lx77WqLmDkEFf6aqKKgR8AZGHMz8W9A>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { OrderAddressesService } from './order-address.service'
import { OrderAddress } from './order-address.entity'

@Resolver(() => OrderAddress)
export class OrderAddressesResolver {
  constructor(private readonly OrderAddressesService: OrderAddressesService) {}

  @Query(() => OrderAddress, { nullable: true })
  orderAddressEntId(
    @Args('orderAddressEntId') orderAddressEntId: string /* UUID */,
  ) {
    return this.OrderAddressesService.getByEntId(orderAddressEntId)
  }

  @Query(() => [OrderAddress])
  orderAddresses(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<OrderAddress[]> {
    return this.OrderAddressesService.findAll(paginationQuery)
  }

  // @Mutation(() => OrderAddress)
  // async addOrderAddress(@Args('email') email: string) {
  //   return await this.OrderAddressesService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
