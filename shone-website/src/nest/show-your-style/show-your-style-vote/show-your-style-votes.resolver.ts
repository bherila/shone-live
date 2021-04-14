import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../../common/auth.guards'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { User } from '../../user/entities/user.entity'
import { ShowYourStyleVote } from './entities/show-your-style-vote.entity'
import { ShowYourStyleVotesService } from './show-your-style-votes.service'

@Resolver(() => ShowYourStyleVote)
export class ShowYourStyleVotesResolver {
  constructor(
    private readonly showYourStyleVotesService: ShowYourStyleVotesService,
  ) {}

  @Query(() => ShowYourStyleVote, { nullable: true })
  showYourStyle(@Args('showId') showId: number) {
    return this.showYourStyleVotesService.findOne(showId)
  }

  @Query(() => [ShowYourStyleVote])
  showYourStyleVotes(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<ShowYourStyleVote[]> {
    return this.showYourStyleVotesService.findAll(paginationQuery)
  }

  @Mutation(() => ShowYourStyleVote)
  @UseGuards(new AuthGuard())
  async addShowYourStyleVote(
    @Context('user') user: User,
    @Args('vote') vote: number,
    @Args('viewDuration') viewDuration: number,
    @Args('entryId') entryId: number,
  ) {
    return await this.showYourStyleVotesService.create({
      vote,
      viewDuration,
      entryId,
      userId: user.id,
    })
  }
}
