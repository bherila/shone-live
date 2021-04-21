/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<RqotpsuZJDK8vzphGZulTnL1qwOrEBIf>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { OrderTaxesService } from './order-tax.service'
import { OrderTax } from './order-tax.entity'

@Resolver(() => OrderTax)
export class OrderTaxesResolver {
  constructor(private readonly OrderTaxesService: OrderTaxesService) {}

  @Query(() => OrderTax, { nullable: true })
  orderTaxEntId(@Args('orderTaxEntId') orderTaxEntId: string /* UUID */) {
    return this.OrderTaxesService.getByEntId(orderTaxEntId)
  }

  @Query(() => [OrderTax])
  orderTaxes(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<OrderTax[]> {
    return this.OrderTaxesService.findAll(paginationQuery)
  }

  // @Mutation(() => OrderTax)
  // async addOrderTax(@Args('email') email: string) {
  //   return await this.OrderTaxesService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
