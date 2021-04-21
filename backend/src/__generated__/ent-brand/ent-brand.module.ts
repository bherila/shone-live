/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<6G/rnCarNEdeeB1Z3Y9jE5TT8tv8oCnG>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EntBrandsRepository } from './ent-brand.repository'
import { EntBrandsResolver } from './ent-brand.resolver'
import { EntBrandsService } from './ent-brand.service'
import { EntBrand } from './ent-brand.entity'

@Module({
  imports: [TypeOrmModule.forFeature([EntBrand, EntBrandsRepository])],
  providers: [EntBrandsService, EntBrandsResolver],
})
export class EntBrandsModule {}
