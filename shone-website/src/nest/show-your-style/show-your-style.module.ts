import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { ShowYourStyleEntry } from './show-your-style-entry/entities/show-your-style-entry.entity'
import { ShowYourStyleEntriesRepository } from './show-your-style-entry/show-your-style-entries.repository'
import { ShowYourStyleEntriesResolver } from './show-your-style-entry/show-your-style-entries.resolver'
import { ShowYourStyleEntriesService } from './show-your-style-entry/show-your-style-entries.service'
import { ShowYourStyleViewRecord } from './show-your-style-view-record/entities/show-your-style-view-record.entity'
import { ShowYourStyleViewRecordsRepository } from './show-your-style-view-record/show-your-style-view-records.repository'
import { ShowYourStyleViewRecordsResolver } from './show-your-style-view-record/show-your-style-view-records.resolver'
import { ShowYourStyleViewRecordsService } from './show-your-style-view-record/show-your-style-view-records.service'
import { ShowYourStyleVote } from './show-your-style-vote/entities/show-your-style-vote.entity'
import { ShowYourStyleVotesRepository } from './show-your-style-vote/show-your-style-votes.repository'
import { ShowYourStyleVotesResolver } from './show-your-style-vote/show-your-style-votes.resolver'
import { ShowYourStyleVotesService } from './show-your-style-vote/show-your-style-votes.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShowYourStyleEntry,
      ShowYourStyleEntriesRepository,
      ShowYourStyleVote,
      ShowYourStyleVotesRepository,
      ShowYourStyleViewRecord,
      ShowYourStyleViewRecordsRepository,
      User,
      UserRepository,
    ]),
  ],
  providers: [
    ShowYourStyleEntriesService,
    ShowYourStyleEntriesResolver,
    ShowYourStyleVotesService,
    ShowYourStyleVotesResolver,
    ShowYourStyleViewRecordsService,
    ShowYourStyleViewRecordsResolver,
  ],
})
export class ShowYourStylesModule {}
