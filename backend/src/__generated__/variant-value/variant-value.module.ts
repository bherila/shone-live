/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<i4KVnt6liHD/R/M1gDvU5bAPNqD/iGJD>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { VariantValuesRepository } from './variant-value.repository'
import { VariantValuesResolver } from './variant-value.resolver'
import { VariantValuesService } from './variant-value.service'
import { VariantValue } from './variant-value.entity'

@Module({
  imports: [TypeOrmModule.forFeature([VariantValue, VariantValuesRepository])],
  providers: [VariantValuesService, VariantValuesResolver],
})
export class VariantValuesModule {}
