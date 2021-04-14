import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../../common/auth.guards'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { User } from '../../user/entities/user.entity'
import { ShowYourStyleEntry } from './entities/show-your-style-entry.entity'
import { ShowYourStyleEntriesService } from './show-your-style-entries.service'

@Resolver(() => ShowYourStyleEntry)
export class ShowYourStyleEntriesResolver {
  constructor(
    private readonly showYourStyleEntriesService: ShowYourStyleEntriesService,
  ) {}

  @Query(() => ShowYourStyleEntry, { nullable: true })
  showYourStyleEntry(@Args('showId') showId: number) {
    return this.showYourStyleEntriesService.findOne(showId)
  }

  @Query(() => ShowYourStyleEntry, { nullable: true })
  @UseGuards(new AuthGuard())
  getRandomShowYourStyleEntry(@Context('user') user: User) {
    return this.showYourStyleEntriesService.findRandomForUser(user.id)
  }

  @Query(() => [ShowYourStyleEntry])
  showYourStyleEntries(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<ShowYourStyleEntry[]> {
    return this.showYourStyleEntriesService.findAll(paginationQuery)
  }

  @Mutation(() => ShowYourStyleEntry)
  @UseGuards(new AuthGuard())
  async addShowYourStyleEntry(
    @Context('user') user: User,
    @Args('videoUrl') videoUrl: string,
  ) {
    return await this.showYourStyleEntriesService.create({
      videoUrl,
      userId: user.id,
    })
  }
}
