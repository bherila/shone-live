/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<3Jo2L9MBmm7M659r/RN0qd5zq40W1MED>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrdersRepository } from './order.repository'
import { OrdersResolver } from './order.resolver'
import { OrdersService } from './order.service'
import { Order } from './order.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrdersRepository])],
  providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
