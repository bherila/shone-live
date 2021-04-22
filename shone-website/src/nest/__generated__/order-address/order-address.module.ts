/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<PU4DW3uVmDlba2Ny22EilMxaeKomroM8>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrderAddress } from './order-address.entity'
import { OrderAddressesRepository } from './order-address.repository'
import { OrderAddressesResolver } from './order-address.resolver'
import { OrderAddressesService } from './order-address.service'

@Module({
  imports: [TypeOrmModule.forFeature([OrderAddress, OrderAddressesRepository])],
  providers: [OrderAddressesService, OrderAddressesResolver],
})
export class OrderAddressesModule {}
