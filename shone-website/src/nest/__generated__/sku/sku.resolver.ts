/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<Vp0Fj5g/8foeQZ/xiVgZ1ZDQP7au/mwo>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Sku } from './sku.entity'
import { SkusService } from './sku.service'

@Resolver(() => Sku)
export class SkusResolver {
  constructor(private readonly SkusService: SkusService) {}

  @Query(() => Sku, { nullable: true })
  skuEntId(@Args('skuEntId') skuEntId: string /* UUID */) {
    return this.SkusService.getByEntId(skuEntId)
  }

  @Query(() => [Sku])
  skus(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Sku[]> {
    return this.SkusService.findAll(paginationQuery)
  }

  // @Mutation(() => Sku)
  // async addSku(@Args('email') email: string) {
  //   return await this.SkusService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
