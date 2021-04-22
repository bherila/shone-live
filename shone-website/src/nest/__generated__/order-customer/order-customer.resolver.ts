/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<lB/XrEVtXSZ78DNd+Trnnh0oVn109XbR>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { OrderCustomer } from './order-customer.entity'
import { OrderCustomersService } from './order-customer.service'

@Resolver(() => OrderCustomer)
export class OrderCustomersResolver {
  constructor(private readonly OrderCustomersService: OrderCustomersService) {}

  @Query(() => OrderCustomer, { nullable: true })
  orderCustomerEntId(
    @Args('orderCustomerEntId') orderCustomerEntId: string /* UUID */,
  ) {
    return this.OrderCustomersService.getByEntId(orderCustomerEntId)
  }

  @Query(() => [OrderCustomer])
  orderCustomers(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<OrderCustomer[]> {
    return this.OrderCustomersService.findAll(paginationQuery)
  }

  // @Mutation(() => OrderCustomer)
  // async addOrderCustomer(@Args('email') email: string) {
  //   return await this.OrderCustomersService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
