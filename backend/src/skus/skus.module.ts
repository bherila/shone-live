import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Variant } from '../variants/entities/variant.entity'
import { VariantRepository } from '../variants/variants.repository'
import { Sku } from './entities/sku.entity'
import { SkuRepository } from './skus.repository'
import { SkuResolver } from './skus.resolver'
import { SkusService } from './skus.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Sku, SkuRepository, VariantRepository, Variant]),
  ],
  providers: [SkusService, SkuResolver],
  exports: [SkusService],
})
export class SkusModule {}
