/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<N2go8SK4krOob73qRvNNicCdxeeEDhsF>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { ProductsService } from './product.service'
import { Product } from './product.entity'

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly ProductsService: ProductsService) {}

  @Query(() => Product, { nullable: true })
  productEntId(@Args('productEntId') productEntId: string /* UUID */) {
    return this.ProductsService.getByEntId(productEntId)
  }

  @Query(() => [Product])
  products(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Product[]> {
    return this.ProductsService.findAll(paginationQuery)
  }

  // @Mutation(() => Product)
  // async addProduct(@Args('email') email: string) {
  //   return await this.ProductsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
