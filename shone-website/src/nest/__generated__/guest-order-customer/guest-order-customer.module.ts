/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<Ha5fxCWWscsUdHeZLUaSDSbqGuXtiRy9>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GuestOrderCustomer } from './guest-order-customer.entity'
import { GuestOrderCustomersRepository } from './guest-order-customer.repository'
import { GuestOrderCustomersResolver } from './guest-order-customer.resolver'
import { GuestOrderCustomersService } from './guest-order-customer.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GuestOrderCustomer,
      GuestOrderCustomersRepository,
    ]),
  ],
  providers: [GuestOrderCustomersService, GuestOrderCustomersResolver],
})
export class GuestOrderCustomersModule {}
