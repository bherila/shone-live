/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<031OgD9I6OC5Sw4nwYfI8lTZy9UP8Z8d>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { ProductVariantsService } from './product-variant.service'
import { ProductVariant } from './product-variant.entity'

@Resolver(() => ProductVariant)
export class ProductVariantsResolver {
  constructor(
    private readonly ProductVariantsService: ProductVariantsService,
  ) {}

  @Query(() => ProductVariant, { nullable: true })
  productVariantEntId(
    @Args('productVariantEntId') productVariantEntId: string /* UUID */,
  ) {
    return this.ProductVariantsService.getByEntId(productVariantEntId)
  }

  @Query(() => [ProductVariant])
  productVariants(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<ProductVariant[]> {
    return this.ProductVariantsService.findAll(paginationQuery)
  }

  // @Mutation(() => ProductVariant)
  // async addProductVariant(@Args('email') email: string) {
  //   return await this.ProductVariantsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
