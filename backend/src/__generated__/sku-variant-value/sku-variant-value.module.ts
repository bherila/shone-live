/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<qG1TifNHxuxffNoo0RZ8tPz6zEeeLKRD>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SkuVariantValuesRepository } from './sku-variant-value.repository'
import { SkuVariantValuesResolver } from './sku-variant-value.resolver'
import { SkuVariantValuesService } from './sku-variant-value.service'
import { SkuVariantValue } from './sku-variant-value.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([SkuVariantValue, SkuVariantValuesRepository]),
  ],
  providers: [SkuVariantValuesService, SkuVariantValuesResolver],
})
export class SkuVariantValuesModule {}
