import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LineItem } from '../line-items/entities/line-item.entity'
import { ShowSegment } from '../show-segment/entities/show-segment.entity'
import { ShowSegmentRepository } from '../show-segment/show-segments.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { Order } from './entities/order.entity'
import { OrderRepository } from './orders.repository'
import { OrderResolver } from './orders.resolver'
import { OrdersService } from './orders.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderRepository,
      LineItem,
      ShowSegment,
      ShowSegmentRepository,
      User,
      UserRepository,
    ]),
  ],
  providers: [OrdersService, OrderResolver],
})
export class OrdersModule {}
