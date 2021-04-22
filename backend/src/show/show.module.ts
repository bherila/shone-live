import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MessageEntity } from '../message/entities/message.entity'
import { MessageRepository } from '../message/message.repository'
import { Product } from '../products/entities/product.entity'
import { ShowSegment } from '../show-segment/entities/show-segment.entity'
import { ShowSegmentRepository } from '../show-segment/show-segments.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { UserShowRole } from '../user-show-role/entities/user-show-role.entity'
import { UserShowRoleRepository } from '../user-show-role/user-show-roles.repository'
import { Show } from './entities/show.entity'
import { ShowRepository } from './show.repository'
import { ShowResolver } from './show.resolver'
import { ShowService } from './show.service'
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShowSegment,
      ShowSegmentRepository,
      Show,
      ShowRepository,
      MessageEntity,
      MessageRepository,
      Product,
      User,
      UserRepository,
      UserShowRole,
      UserShowRoleRepository,
    ]),
  ],
  providers: [ShowResolver, ShowService],
})
export class ShowModule {}
