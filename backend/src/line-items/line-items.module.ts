import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Brand } from '../brands/entities/brand.entity'
import { Order } from '../orders/entities/order.entity'
import { OrderRepository } from '../orders/orders.repository'
import { ShowSegment } from '../show-segment/entities/show-segment.entity'
import { SkuRepository } from '../skus/skus.repository'
import { LineItem } from './entities/line-item.entity'
import { LineItemsRepository } from './line-items.repository'
import { LineItemsResolver } from './line-items.resolver'
import { LineItemsService } from './line-items.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand,
      ShowSegment,
      LineItem,
      Order,
      LineItemsRepository,
      OrderRepository,
      SkuRepository,
    ]),
  ],
  providers: [LineItemsService, LineItemsResolver],
})
export class LineItemsModule {}
