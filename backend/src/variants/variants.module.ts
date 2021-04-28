import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductRepository } from '../products/products.repository'
import { Sku } from '../skus/entities/sku.entity'
import { SkusModule } from '../skus/skus.module'
import { Variant } from './entities/variant.entity'
import { VariantRepository } from './variants.repository'
import { VariantResolver } from './variants.resolver'
import { VariantsService } from './variants.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Variant,
      VariantRepository,
      ProductRepository,
      Sku,
    ]),
    SkusModule,
  ],
  providers: [VariantsService, VariantResolver],
  exports: [VariantsService],
})
export class VariantsModule {}
