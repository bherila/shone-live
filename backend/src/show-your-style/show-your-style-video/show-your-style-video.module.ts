import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ShowYourStyleVideoIdEntry } from '../show-your-style-entry/entities/show-your-style-video-entry.entity'
import { StyleVideoController } from './show-your-style-video.controller'
import { StyleVideoService } from './show-your-style-video.service'

@Module({
  imports: [TypeOrmModule.forFeature([ShowYourStyleVideoIdEntry])],
  providers: [StyleVideoService],
  controllers: [StyleVideoController],
  exports: [],
})
export class StyleVideoEntryModule {}
