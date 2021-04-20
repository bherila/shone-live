/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<vQkTeCvu0odP75pXnp9EQOmQw5Q9Qgi6>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OffersRepository } from './offer.repository'
import { OffersResolver } from './offer.resolver'
import { OffersService } from './offer.service'
import { Offer } from './offer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Offer, OffersRepository])],
  providers: [OffersService, OffersResolver],
})
export class OffersModule {}
