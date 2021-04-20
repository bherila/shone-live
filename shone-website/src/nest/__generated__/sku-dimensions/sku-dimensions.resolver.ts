/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<4qwrw94T0+SGCr2r5wapzmTVclKGqp9j>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { SkuDimensionsService } from './sku-dimensions.service'
import { SkuDimensions } from './sku-dimensions.entity'

@Resolver(() => SkuDimensions)
export class SkuDimensionsResolver {
  constructor(private readonly SkuDimensionsService: SkuDimensionsService) {}

  @Query(() => SkuDimensions, { nullable: true })
  skuDimensionsEntId(
    @Args('skuDimensionsEntId') skuDimensionsEntId: string /* UUID */,
  ) {
    return this.SkuDimensionsService.getByEntId(skuDimensionsEntId)
  }

  @Query(() => [SkuDimensions])
  skuDimensions(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<SkuDimensions[]> {
    return this.SkuDimensionsService.findAll(paginationQuery)
  }

  // @Mutation(() => SkuDimensions)
  // async addSkuDimensions(@Args('email') email: string) {
  //   return await this.SkuDimensionsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
