import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Order } from '../orders/entities/order.entity'
import { OrderRepository } from '../orders/orders.repository'
import { SkuRepository } from '../skus/skus.repository'
import { LineItem } from './entities/line-item.entity'
import { LineItemsRepository } from './line-items.repository'
import { LineItemsResolver } from './line-items.resolver'
import { LineItemsService } from './line-items.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
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
