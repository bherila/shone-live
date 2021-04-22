/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<</T4P3KGJsUB9Yw79E3k0VxxU27H256uo>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CartPaymentMethod } from './cart-payment-method.entity'
import { CartPaymentMethodsService } from './cart-payment-method.service'

@Resolver(() => CartPaymentMethod)
export class CartPaymentMethodsResolver {
  constructor(
    private readonly CartPaymentMethodsService: CartPaymentMethodsService,
  ) {}

  @Query(() => CartPaymentMethod, { nullable: true })
  cartPaymentMethodEntId(
    @Args('cartPaymentMethodEntId') cartPaymentMethodEntId: string /* UUID */,
  ) {
    return this.CartPaymentMethodsService.getByEntId(cartPaymentMethodEntId)
  }

  @Query(() => [CartPaymentMethod])
  cartPaymentMethods(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<CartPaymentMethod[]> {
    return this.CartPaymentMethodsService.findAll(paginationQuery)
  }

  // @Mutation(() => CartPaymentMethod)
  // async addCartPaymentMethod(@Args('email') email: string) {
  //   return await this.CartPaymentMethodsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
