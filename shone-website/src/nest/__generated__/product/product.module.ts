/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<V9fLPFUbd7dnstdBM2QoDqziPqHIq6wT>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Product } from './product.entity'
import { ProductsRepository } from './product.repository'
import { ProductsResolver } from './product.resolver'
import { ProductsService } from './product.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductsRepository])],
  providers: [ProductsService, ProductsResolver],
})
export class ProductsModule {}
