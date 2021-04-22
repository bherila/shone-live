/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<4ve+QS4Rbftvo4Kl6fTmg+fGl26rL2hh>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { VariantValue } from './variant-value.entity'
import { VariantValuesService } from './variant-value.service'

@Resolver(() => VariantValue)
export class VariantValuesResolver {
  constructor(private readonly VariantValuesService: VariantValuesService) {}

  @Query(() => VariantValue, { nullable: true })
  variantValueEntId(
    @Args('variantValueEntId') variantValueEntId: string /* UUID */,
  ) {
    return this.VariantValuesService.getByEntId(variantValueEntId)
  }

  @Query(() => [VariantValue])
  variantValues(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<VariantValue[]> {
    return this.VariantValuesService.findAll(paginationQuery)
  }

  // @Mutation(() => VariantValue)
  // async addVariantValue(@Args('email') email: string) {
  //   return await this.VariantValuesService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
