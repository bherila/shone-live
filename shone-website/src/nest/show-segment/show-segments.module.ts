import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BrandRepository } from '../brands/brands.repository'
import { Brand } from '../brands/entities/brand.entity'
import { Show } from '../show/entities/show.entity'
import { ShowRepository } from '../show/show.repository'
import { ShowSegment } from './entities/show-segment.entity'
import { ShowSegmentRepository } from './show-segments.repository'
import { ShowSegmentResolver } from './show-segments.resolver'
import { ShowSegmentsService } from './show-segments.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand,
      BrandRepository,
      ShowSegment,
      ShowSegmentRepository,
      Show,
      ShowRepository,
    ]),
  ],
  providers: [ShowSegmentsService, ShowSegmentResolver],
})
export class ShowSegmentsModule {}
