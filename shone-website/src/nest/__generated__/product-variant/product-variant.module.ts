/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<E4PjNIuRb43Obshy7JnsZ8A+Gelb2OhQ>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductVariantsRepository } from './product-variant.repository'
import { ProductVariantsResolver } from './product-variant.resolver'
import { ProductVariantsService } from './product-variant.service'
import { ProductVariant } from './product-variant.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductVariant, ProductVariantsRepository]),
  ],
  providers: [ProductVariantsService, ProductVariantsResolver],
})
export class ProductVariantsModule {}
