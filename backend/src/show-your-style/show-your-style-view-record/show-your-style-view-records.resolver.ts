import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../../common/auth.guards'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { User } from '../../user/entities/user.entity'
import { ShowYourStyleViewRecord } from './entities/show-your-style-view-record.entity'
import { ShowYourStyleViewRecordsService } from './show-your-style-view-records.service'

@Resolver(() => ShowYourStyleViewRecord)
export class ShowYourStyleViewRecordsResolver {
  constructor(
    private readonly showYourStyleViewRecordsService: ShowYourStyleViewRecordsService,
  ) {}

  @Query(() => ShowYourStyleViewRecord, { nullable: true })
  show_your_style_view_record(@Args('showId') showId: string) {
    return this.showYourStyleViewRecordsService.findOne(showId)
  }

  @Query(() => [ShowYourStyleViewRecord])
  show_your_style_view_records(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<ShowYourStyleViewRecord[]> {
    return this.showYourStyleViewRecordsService.findAll(paginationQuery)
  }

  @Mutation(() => ShowYourStyleViewRecord)
  @UseGuards(new AuthGuard())
  async add_show_your_style_view_record(
    @Context('user') user: User,
    @Args('entryId') entryId: string,
  ) {
    return await this.showYourStyleViewRecordsService.create({
      entryId,
      userId: user.id,
    })
  }
}
