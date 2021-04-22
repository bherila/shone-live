/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<</ME5VzKkdz03PQcsy9qwOpuaiwpmf14d>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Variant } from './variant.entity'
import { VariantsService } from './variant.service'

@Resolver(() => Variant)
export class VariantsResolver {
  constructor(private readonly VariantsService: VariantsService) {}

  @Query(() => Variant, { nullable: true })
  variantEntId(@Args('variantEntId') variantEntId: string /* UUID */) {
    return this.VariantsService.getByEntId(variantEntId)
  }

  @Query(() => [Variant])
  variants(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Variant[]> {
    return this.VariantsService.findAll(paginationQuery)
  }

  // @Mutation(() => Variant)
  // async addVariant(@Args('email') email: string) {
  //   return await this.VariantsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
