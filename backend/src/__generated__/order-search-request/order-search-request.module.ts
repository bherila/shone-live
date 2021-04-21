/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<YHDYkM7jus9N8lqPTQ3MyK+9L5rw3ybD>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrderSearchRequestsRepository } from './order-search-request.repository'
import { OrderSearchRequestsResolver } from './order-search-request.resolver'
import { OrderSearchRequestsService } from './order-search-request.service'
import { OrderSearchRequest } from './order-search-request.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderSearchRequest,
      OrderSearchRequestsRepository,
    ]),
  ],
  providers: [OrderSearchRequestsService, OrderSearchRequestsResolver],
})
export class OrderSearchRequestsModule {}
