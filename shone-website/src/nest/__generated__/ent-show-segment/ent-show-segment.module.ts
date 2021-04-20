/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<RuYnMl3CYuOpHe0b5T1c+Syf3AIfp4wG>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EntShowSegmentsRepository } from './ent-show-segment.repository'
import { EntShowSegmentsResolver } from './ent-show-segment.resolver'
import { EntShowSegmentsService } from './ent-show-segment.service'
import { EntShowSegment } from './ent-show-segment.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([EntShowSegment, EntShowSegmentsRepository]),
  ],
  providers: [EntShowSegmentsService, EntShowSegmentsResolver],
})
export class EntShowSegmentsModule {}
