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
  show_your_style_vote(@Args('showId') showId: string) {
    return this.showYourStyleVotesService.findOne(showId)
  }

  @Query(() => [ShowYourStyleVote])
  show_your_style_votes(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<ShowYourStyleVote[]> {
    return this.showYourStyleVotesService.findAll(paginationQuery)
  }

  @Mutation(() => ShowYourStyleVote)
  @UseGuards(new AuthGuard())
  async add_show_your_style_vote(
    @Context('user') user: User,
    @Args('vote') vote: number,
    @Args('viewDuration') viewDuration: number,
    @Args('entryId') entryId: string,
  ) {
    return await this.showYourStyleVotesService.create({
      vote,
      viewDuration,
      entryId,
      userId: user.id,
    })
  }
}
