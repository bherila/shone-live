import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { CreateShowSegmentDto } from './dto/create-show-segment.dto'
import { UpdateShowSegmentDto } from './dto/update-show-segment.dto'
import { ShowSegment } from './entities/show-segment.entity'
import { ShowSegmentsService } from './show-segments.service'

@Resolver(() => ShowSegment)
export class ShowSegmentResolver {
  constructor(private readonly showsegmentsService: ShowSegmentsService) {}

  @Query(() => ShowSegment, { nullable: true })
  showSegment(@Args('showsegmentId') showsegmentId: string) {
    return this.showsegmentsService.findOne(showsegmentId)
  }

  @Query(() => [ShowSegment])
  showSegments(): Promise<ShowSegment[]> {
    return this.showsegmentsService.findAll()
  }

  @Mutation(() => ShowSegment)
  @UseGuards(new AuthGuard())
  async addShowSegment(
    @Context('user') user,
    @Args('data') data: CreateShowSegmentDto,
  ) {
    return await this.showsegmentsService.create(data, user.id)
  }

  @Mutation(() => ShowSegment)
  @UseGuards(new AuthGuard())
  async updateShowSegment(@Args('data') data: UpdateShowSegmentDto) {
    return await this.showsegmentsService.update(data)
  }
}
