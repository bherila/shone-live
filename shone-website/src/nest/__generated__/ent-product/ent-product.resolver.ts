/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<S99VkxZb6rnHx1XyyzrUTEMGrPUPeuk9>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { EntProduct } from './ent-product.entity'
import { EntProductsService } from './ent-product.service'

@Resolver(() => EntProduct)
export class EntProductsResolver {
  constructor(private readonly EntProductsService: EntProductsService) {}

  @Query(() => EntProduct, { nullable: true })
  entProductEntId(@Args('entProductEntId') entProductEntId: string /* UUID */) {
    return this.EntProductsService.getByEntId(entProductEntId)
  }

  @Query(() => [EntProduct])
  entProducts(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<EntProduct[]> {
    return this.EntProductsService.findAll(paginationQuery)
  }

  // @Mutation(() => EntProduct)
  // async addEntProduct(@Args('email') email: string) {
  //   return await this.EntProductsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
