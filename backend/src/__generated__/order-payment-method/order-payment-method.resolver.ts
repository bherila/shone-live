/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<znXUCfCP/lyO78VnqV6TqtsbfMhSKS4Z>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { OrderPaymentMethodsService } from './order-payment-method.service'
import { OrderPaymentMethod } from './order-payment-method.entity'

@Resolver(() => OrderPaymentMethod)
export class OrderPaymentMethodsResolver {
  constructor(
    private readonly OrderPaymentMethodsService: OrderPaymentMethodsService,
  ) {}

  @Query(() => OrderPaymentMethod, { nullable: true })
  orderPaymentMethodEntId(
    @Args('orderPaymentMethodEntId') orderPaymentMethodEntId: string /* UUID */,
  ) {
    return this.OrderPaymentMethodsService.getByEntId(orderPaymentMethodEntId)
  }

  @Query(() => [OrderPaymentMethod])
  orderPaymentMethods(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<OrderPaymentMethod[]> {
    return this.OrderPaymentMethodsService.findAll(paginationQuery)
  }

  // @Mutation(() => OrderPaymentMethod)
  // async addOrderPaymentMethod(@Args('email') email: string) {
  //   return await this.OrderPaymentMethodsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
