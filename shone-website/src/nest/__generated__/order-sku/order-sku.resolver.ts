/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ivZUhnuKEqRT9lZHZFZtUcHgqKIeUKSk>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { OrderSkusService } from './order-sku.service'
import { OrderSku } from './order-sku.entity'

@Resolver(() => OrderSku)
export class OrderSkusResolver {
  constructor(private readonly OrderSkusService: OrderSkusService) {}

  @Query(() => OrderSku, { nullable: true })
  orderSkuEntId(@Args('orderSkuEntId') orderSkuEntId: string /* UUID */) {
    return this.OrderSkusService.getByEntId(orderSkuEntId)
  }

  @Query(() => [OrderSku])
  orderSkus(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<OrderSku[]> {
    return this.OrderSkusService.findAll(paginationQuery)
  }

  // @Mutation(() => OrderSku)
  // async addOrderSku(@Args('email') email: string) {
  //   return await this.OrderSkusService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
