/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<hqperdP789cj01HCA8IxXDHuL+ykB71a>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrderTax } from './order-tax.entity'
import { OrderTaxesRepository } from './order-tax.repository'
import { OrderTaxesResolver } from './order-tax.resolver'
import { OrderTaxesService } from './order-tax.service'

@Module({
  imports: [TypeOrmModule.forFeature([OrderTax, OrderTaxesRepository])],
  providers: [OrderTaxesService, OrderTaxesResolver],
})
export class OrderTaxesModule {}
