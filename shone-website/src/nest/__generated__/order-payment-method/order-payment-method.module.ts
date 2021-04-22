/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<15kRvZpPBS1QF18QUDbqdgbtHT8UN2wx>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrderPaymentMethod } from './order-payment-method.entity'
import { OrderPaymentMethodsRepository } from './order-payment-method.repository'
import { OrderPaymentMethodsResolver } from './order-payment-method.resolver'
import { OrderPaymentMethodsService } from './order-payment-method.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderPaymentMethod,
      OrderPaymentMethodsRepository,
    ]),
  ],
  providers: [OrderPaymentMethodsService, OrderPaymentMethodsResolver],
})
export class OrderPaymentMethodsModule {}
