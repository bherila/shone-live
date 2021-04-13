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
  showYourStyleViewRecord(@Args('showId') showId: number) {
    return this.showYourStyleViewRecordsService.findOne(showId)
  }

  @Query(() => [ShowYourStyleViewRecord])
  showYourStyleViewRecords(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<ShowYourStyleViewRecord[]> {
    return this.showYourStyleViewRecordsService.findAll(paginationQuery)
  }

  @Mutation(() => ShowYourStyleViewRecord)
  @UseGuards(new AuthGuard())
  async addShowYourStyleViewRecord(
    @Context('user') user: User,
    @Args('entry_id') entry_id: number,
  ) {
    return await this.showYourStyleViewRecordsService.create({
      entry_id,
      user_id: user.id,
    })
  }
}
