/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<+X94SMrxdYGA38BEF0Xc5JvQkDQGk70j>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BagShippingMethod } from './bag-shipping-method.entity'
import { BagShippingMethodsRepository } from './bag-shipping-method.repository'
import { BagShippingMethodsResolver } from './bag-shipping-method.resolver'
import { BagShippingMethodsService } from './bag-shipping-method.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([BagShippingMethod, BagShippingMethodsRepository]),
  ],
  providers: [BagShippingMethodsService, BagShippingMethodsResolver],
})
export class BagShippingMethodsModule {}
