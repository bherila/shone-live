/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<8eZ9TruPUQptKj6ONHtSa9YKArU0im5B>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { ProductVariantValue } from './product-variant-value.entity'
import { ProductVariantValuesService } from './product-variant-value.service'

@Resolver(() => ProductVariantValue)
export class ProductVariantValuesResolver {
  constructor(
    private readonly ProductVariantValuesService: ProductVariantValuesService,
  ) {}

  @Query(() => ProductVariantValue, { nullable: true })
  productVariantValueEntId(
    @Args('productVariantValueEntId')
    productVariantValueEntId: string /* UUID */,
  ) {
    return this.ProductVariantValuesService.getByEntId(productVariantValueEntId)
  }

  @Query(() => [ProductVariantValue])
  productVariantValues(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<ProductVariantValue[]> {
    return this.ProductVariantValuesService.findAll(paginationQuery)
  }

  // @Mutation(() => ProductVariantValue)
  // async addProductVariantValue(@Args('email') email: string) {
  //   return await this.ProductVariantValuesService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
