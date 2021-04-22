/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<o4NO54smj1amAy2qqX4nR5cFAvhBLpUh>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Sort } from './sort.entity'
import { SortsService } from './sort.service'

@Resolver(() => Sort)
export class SortsResolver {
  constructor(private readonly SortsService: SortsService) {}

  @Query(() => Sort, { nullable: true })
  sortEntId(@Args('sortEntId') sortEntId: string /* UUID */) {
    return this.SortsService.getByEntId(sortEntId)
  }

  @Query(() => [Sort])
  sorts(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Sort[]> {
    return this.SortsService.findAll(paginationQuery)
  }

  // @Mutation(() => Sort)
  // async addSort(@Args('email') email: string) {
  //   return await this.SortsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
