/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<bsiVbeeCXuK1c/w0g7Y1nZiSDz+1BwvO>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { BagShippingMethod } from './bag-shipping-method.entity'
import { BagShippingMethodsService } from './bag-shipping-method.service'

@Resolver(() => BagShippingMethod)
export class BagShippingMethodsResolver {
  constructor(
    private readonly BagShippingMethodsService: BagShippingMethodsService,
  ) {}

  @Query(() => BagShippingMethod, { nullable: true })
  bagShippingMethodEntId(
    @Args('bagShippingMethodEntId') bagShippingMethodEntId: string /* UUID */,
  ) {
    return this.BagShippingMethodsService.getByEntId(bagShippingMethodEntId)
  }

  @Query(() => [BagShippingMethod])
  bagShippingMethods(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<BagShippingMethod[]> {
    return this.BagShippingMethodsService.findAll(paginationQuery)
  }

  // @Mutation(() => BagShippingMethod)
  // async addBagShippingMethod(@Args('email') email: string) {
  //   return await this.BagShippingMethodsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
