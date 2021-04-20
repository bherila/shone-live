/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<RiH0Xc3JRPVwFKYFeA8sWK1hhwwxj8yn>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CartPaymentMethodsRepository } from './cart-payment-method.repository'
import { CartPaymentMethodsResolver } from './cart-payment-method.resolver'
import { CartPaymentMethodsService } from './cart-payment-method.service'
import { CartPaymentMethod } from './cart-payment-method.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CartPaymentMethod, CartPaymentMethodsRepository]),
  ],
  providers: [CartPaymentMethodsService, CartPaymentMethodsResolver],
})
export class CartPaymentMethodsModule {}
