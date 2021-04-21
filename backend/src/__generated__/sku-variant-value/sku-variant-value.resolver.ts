/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ctWIIBkj3UZR8MFoa6jS/ZKgxPaRx+Xr>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { SkuVariantValuesService } from './sku-variant-value.service'
import { SkuVariantValue } from './sku-variant-value.entity'

@Resolver(() => SkuVariantValue)
export class SkuVariantValuesResolver {
  constructor(
    private readonly SkuVariantValuesService: SkuVariantValuesService,
  ) {}

  @Query(() => SkuVariantValue, { nullable: true })
  skuVariantValueEntId(
    @Args('skuVariantValueEntId') skuVariantValueEntId: string /* UUID */,
  ) {
    return this.SkuVariantValuesService.getByEntId(skuVariantValueEntId)
  }

  @Query(() => [SkuVariantValue])
  skuVariantValues(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<SkuVariantValue[]> {
    return this.SkuVariantValuesService.findAll(paginationQuery)
  }

  // @Mutation(() => SkuVariantValue)
  // async addSkuVariantValue(@Args('email') email: string) {
  //   return await this.SkuVariantValuesService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
