/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<qR4rVUDquXqgrou/zEMh9/B0h8y0ueED>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CustomerAddressesRepository } from './customer-address.repository'
import { CustomerAddressesResolver } from './customer-address.resolver'
import { CustomerAddressesService } from './customer-address.service'
import { CustomerAddress } from './customer-address.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerAddress, CustomerAddressesRepository]),
  ],
  providers: [CustomerAddressesService, CustomerAddressesResolver],
})
export class CustomerAddressesModule {}
