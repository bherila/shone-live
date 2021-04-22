/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<cDSiHJlp9HmPgTiuPScbHMLzL8GDIU67>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { PageProduct } from './page-product.entity'
import { PageProductsService } from './page-product.service'

@Resolver(() => PageProduct)
export class PageProductsResolver {
  constructor(private readonly PageProductsService: PageProductsService) {}

  @Query(() => PageProduct, { nullable: true })
  pageProductEntId(
    @Args('pageProductEntId') pageProductEntId: string /* UUID */,
  ) {
    return this.PageProductsService.getByEntId(pageProductEntId)
  }

  @Query(() => [PageProduct])
  pageProducts(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<PageProduct[]> {
    return this.PageProductsService.findAll(paginationQuery)
  }

  // @Mutation(() => PageProduct)
  // async addPageProduct(@Args('email') email: string) {
  //   return await this.PageProductsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
