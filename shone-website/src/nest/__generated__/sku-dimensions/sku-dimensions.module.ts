/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<fCJ4WC1gApRVXtiqxz5GvaspmNZ/Pn87>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SkuDimensionsRepository } from './sku-dimensions.repository'
import { SkuDimensionsResolver } from './sku-dimensions.resolver'
import { SkuDimensionsService } from './sku-dimensions.service'
import { SkuDimensions } from './sku-dimensions.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SkuDimensions, SkuDimensionsRepository])],
  providers: [SkuDimensionsService, SkuDimensionsResolver],
})
export class SkuDimensionsModule {}
