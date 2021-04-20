/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<yIGknAy4gUubhNTH8FGPIhJryqgEWW02>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrderCustomersRepository } from './order-customer.repository'
import { OrderCustomersResolver } from './order-customer.resolver'
import { OrderCustomersService } from './order-customer.service'
import { OrderCustomer } from './order-customer.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderCustomer, OrderCustomersRepository]),
  ],
  providers: [OrderCustomersService, OrderCustomersResolver],
})
export class OrderCustomersModule {}
