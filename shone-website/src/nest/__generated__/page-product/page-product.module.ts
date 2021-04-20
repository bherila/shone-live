/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<3PQYPA5KhWOny71Qo0KUk9JiadkZr9Rp>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PageProductsRepository } from './page-product.repository'
import { PageProductsResolver } from './page-product.resolver'
import { PageProductsService } from './page-product.service'
import { PageProduct } from './page-product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PageProduct, PageProductsRepository])],
  providers: [PageProductsService, PageProductsResolver],
})
export class PageProductsModule {}
