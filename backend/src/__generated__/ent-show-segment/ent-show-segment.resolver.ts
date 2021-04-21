/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<j2tJGmT01erDiePN8tdjjqF5YILhZHVZ>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { EntShowSegmentsService } from './ent-show-segment.service'
import { EntShowSegment } from './ent-show-segment.entity'

@Resolver(() => EntShowSegment)
export class EntShowSegmentsResolver {
  constructor(
    private readonly EntShowSegmentsService: EntShowSegmentsService,
  ) {}

  @Query(() => EntShowSegment, { nullable: true })
  entShowSegmentEntId(
    @Args('entShowSegmentEntId') entShowSegmentEntId: string /* UUID */,
  ) {
    return this.EntShowSegmentsService.getByEntId(entShowSegmentEntId)
  }

  @Query(() => [EntShowSegment])
  entShowSegments(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<EntShowSegment[]> {
    return this.EntShowSegmentsService.findAll(paginationQuery)
  }

  // @Mutation(() => EntShowSegment)
  // async addEntShowSegment(@Args('email') email: string) {
  //   return await this.EntShowSegmentsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
