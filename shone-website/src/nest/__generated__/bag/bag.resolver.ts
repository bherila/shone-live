/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<0yEgEOhNa6hG+ctJV6ASLSww6lkoGogs>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { BagsService } from './bag.service'
import { Bag } from './bag.entity'

@Resolver(() => Bag)
export class BagsResolver {
  constructor(private readonly BagsService: BagsService) {}

  @Query(() => Bag, { nullable: true })
  bagEntId(@Args('bagEntId') bagEntId: string /* UUID */) {
    return this.BagsService.getByEntId(bagEntId)
  }

  @Query(() => [Bag])
  bags(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Bag[]> {
    return this.BagsService.findAll(paginationQuery)
  }

  // @Mutation(() => Bag)
  // async addBag(@Args('email') email: string) {
  //   return await this.BagsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
