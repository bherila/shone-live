import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../../user/entities/user.entity'
import { UserRepository } from '../../user/user.repository'
import { ShowYourStyleVideoIdEntry } from '../show-your-style-entry/entities/show-your-style-video-entry.entity'
import { StyleVideoController } from './show-your-style-video.controller'
import { StyleVideoService } from './show-your-style-video.service'
import { ShowYourStyleVideoIdEntriesRepository } from './show-your-style-video-entry.repository'
import { ShowYourStyleVideoIdEntryResolver } from './show-your-style-video-entry.resolver'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShowYourStyleVideoIdEntry,
      ShowYourStyleVideoIdEntriesRepository,
      User,
      UserRepository,
    ]),
  ],
  providers: [StyleVideoService, ShowYourStyleVideoIdEntryResolver],
  controllers: [StyleVideoController],
  exports: [],
})
export class StyleVideoEntryModule {}
