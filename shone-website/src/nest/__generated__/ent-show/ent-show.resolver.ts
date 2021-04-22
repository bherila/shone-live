/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<bmEvFFEWYdJ/TkAxAW7qo+TYtOJaT6W4>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { EntShow } from './ent-show.entity'
import { EntShowsService } from './ent-show.service'

@Resolver(() => EntShow)
export class EntShowsResolver {
  constructor(private readonly EntShowsService: EntShowsService) {}

  @Query(() => EntShow, { nullable: true })
  entShowEntId(@Args('entShowEntId') entShowEntId: string /* UUID */) {
    return this.EntShowsService.getByEntId(entShowEntId)
  }

  @Query(() => [EntShow])
  entShows(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<EntShow[]> {
    return this.EntShowsService.findAll(paginationQuery)
  }

  // @Mutation(() => EntShow)
  // async addEntShow(@Args('email') email: string) {
  //   return await this.EntShowsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
