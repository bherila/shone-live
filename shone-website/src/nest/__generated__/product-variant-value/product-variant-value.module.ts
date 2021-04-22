/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<tcfsE5UGrBDYZ+dc+AoU+0SUO7QcpfV1>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductVariantValue } from './product-variant-value.entity'
import { ProductVariantValuesRepository } from './product-variant-value.repository'
import { ProductVariantValuesResolver } from './product-variant-value.resolver'
import { ProductVariantValuesService } from './product-variant-value.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductVariantValue,
      ProductVariantValuesRepository,
    ]),
  ],
  providers: [ProductVariantValuesService, ProductVariantValuesResolver],
})
export class ProductVariantValuesModule {}
