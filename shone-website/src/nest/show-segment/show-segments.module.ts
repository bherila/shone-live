import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BrandRepository } from '../brands/brands.repository'
import { Brand } from '../brands/entities/brand.entity'
import { Show } from '../show/entities/show.entity'
import { ShowRepository } from '../show/show.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { ShowSegment } from './entities/show-segment.entity'
import { ShowSegmentRepository } from './show-segments.repository'
import { ShowSegmentResolver } from './show-segments.resolver'
import { ShowSegmentsService } from './show-segments.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand,
      BrandRepository,
      Show,
      ShowSegment,
      ShowSegmentRepository,
      ShowRepository,
      User,
      UserRepository,
    ]),
  ],
  providers: [ShowSegmentsService, ShowSegmentResolver],
})
export class ShowSegmentsModule {}
