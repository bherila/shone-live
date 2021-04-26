import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ShowYourStyleEntry } from './entities/show-your-style-entry.entity'
import { ShowYourStyleVideoIdEntry } from './entities/show-your-style-video-entry.entity'
import { ShowYourStyleEntriesRepository } from './show-your-style-entries.repository'
import { ShowYourStyleVideoIdEntriesRepository } from './show-your-style-entries.repository'
import { ShowYourStyleEntriesResolver } from './show-your-style-entries.resolver'
import { ShowYourStyleEntriesService } from './show-your-style-entries.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShowYourStyleEntry,
      ShowYourStyleVideoIdEntry,
      ShowYourStyleVideoIdEntriesRepository,
      ShowYourStyleEntriesRepository,
    ]),
  ],
  providers: [ShowYourStyleEntriesService, ShowYourStyleEntriesResolver],
})
export class ShowYourStyleEntriesModule {}
