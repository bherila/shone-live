/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<mj+3G+IhyTZh58r+YQ+KDBdhEdk5Z6Cc>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrderShippingMethodWrapper } from './order-shipping-method-wrapper.entity'
import { OrderShippingMethodWrappersRepository } from './order-shipping-method-wrapper.repository'
import { OrderShippingMethodWrappersResolver } from './order-shipping-method-wrapper.resolver'
import { OrderShippingMethodWrappersService } from './order-shipping-method-wrapper.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderShippingMethodWrapper,
      OrderShippingMethodWrappersRepository,
    ]),
  ],
  providers: [
    OrderShippingMethodWrappersService,
    OrderShippingMethodWrappersResolver,
  ],
})
export class OrderShippingMethodWrappersModule {}
