/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<LquvsG+TYCCZyrsCPpqjIPSk0Z7gctYq>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { DimensionsService } from './dimension.service'
import { Dimension } from './dimension.entity'

@Resolver(() => Dimension)
export class DimensionsResolver {
  constructor(private readonly DimensionsService: DimensionsService) {}

  @Query(() => Dimension, { nullable: true })
  dimensionEntId(@Args('dimensionEntId') dimensionEntId: string /* UUID */) {
    return this.DimensionsService.getByEntId(dimensionEntId)
  }

  @Query(() => [Dimension])
  dimensions(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Dimension[]> {
    return this.DimensionsService.findAll(paginationQuery)
  }

  // @Mutation(() => Dimension)
  // async addDimension(@Args('email') email: string) {
  //   return await this.DimensionsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
