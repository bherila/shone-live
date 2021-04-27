import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BrandRepository } from '../brands/brands.repository'
import { ProductRepository } from '../products/products.repository'
import { ShowRepository } from '../show/show.repository'
import { UserRepository } from '../user/user.repository'
import { UserBrandRoleRepository } from '../user-brand-role/user-brand-roles.repository'
import { UserShowRoleRepository } from '../user-show-role/user-show-roles.repository'
import { ShowSegment } from './entities/show-segment.entity'
import { ShowSegmentRepository } from './show-segments.repository'
import { ShowSegmentResolver } from './show-segments.resolver'
import { ShowSegmentsService } from './show-segments.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BrandRepository,
      ShowSegment,
      ShowSegmentRepository,
      ShowRepository,
      UserRepository,
      UserBrandRoleRepository,
      UserShowRoleRepository,
      ProductRepository,
    ]),
  ],
  providers: [ShowSegmentsService, ShowSegmentResolver],
  exports: [ShowSegmentsService],
})
export class ShowSegmentsModule {}
