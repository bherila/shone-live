import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CreateShowSegmentDto } from './dto/create-show-segment.dto'
import { UpdateShowSegmentDto } from './dto/update-show-segment.dto'
import { ShowSegment } from './entities/show-segment.entity'
import { ShowSegmentsService } from './show-segments.service'

@Resolver(() => ShowSegment)
export class ShowSegmentResolver {
  constructor(private readonly showsegmentsService: ShowSegmentsService) {}

  @Query(() => ShowSegment, { nullable: true })
  showsegment(@Args('showsegmentId') showsegmentId: string) {
    return this.showsegmentsService.findOne(showsegmentId)
  }

  @Query(() => [ShowSegment])
  showsegments(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<ShowSegment[]> {
    return this.showsegmentsService.findAll(paginationQuery)
  }

  @Query(() => [ShowSegment])
  @UseGuards(new AuthGuard())
  my_showsegments(
    @Context('user') user,
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<ShowSegment[]> {
    return this.showsegmentsService.findByUser(paginationQuery, user.id)
  }

  @Mutation(() => ShowSegment)
  @UseGuards(new AuthGuard())
  async add_showsegment(
    @Context('user') user,
    @Args('data') data: CreateShowSegmentDto,
  ) {
    return await this.showsegmentsService.create(data, user.id)
  }

  @Mutation(() => ShowSegment)
  @UseGuards(new AuthGuard())
  async update_showsegment(@Args('data') data: UpdateShowSegmentDto) {
    return await this.showsegmentsService.update(data)
  }
}
