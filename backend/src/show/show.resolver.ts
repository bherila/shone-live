import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CreateShowDto } from './dto/create-show.dto'
import { CreateShowWithSegmentDto } from './dto/create-show-with-segment'
import { Show } from './entities/show.entity'
import { ShowService } from './show.service'

@Resolver(() => Show)
export class ShowResolver {
  constructor(private readonly showsService: ShowService) {}

  @Query(() => Show, { nullable: true })
  show(@Args('showId') showId: string) {
    return this.showsService.findOne(showId)
  }

  @Query(() => [Show])
  shows(): Promise<Show[]> {
    return this.showsService.findAll()
  }

  @Query(() => [Show])
  @UseGuards(new AuthGuard())
  brandShows(
    @Context('user') user,
    @Args('brandId') brandId: string,
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Show[]> {
    return this.showsService.findByBrand(paginationQuery, brandId)
  }

  @Mutation(() => Show)
  @UseGuards(new AuthGuard())
  async add_show(@Context('user') user, @Args('data') data: CreateShowDto) {
    return await this.showsService.create(data, user.id)
  }

  @Mutation(() => Show)
  @UseGuards(new AuthGuard())
  async addShowWithSegment(
    @Context('user') user,
    @Args('data') data: CreateShowWithSegmentDto,
  ) {
    return await this.showsService.createWithSegment(data, user.id)
  }
}
