/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<XDZVv56o1hV5RsAFG+F5a91u+0m2mZR0>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EntProduct } from './ent-product.entity'
import { EntProductsRepository } from './ent-product.repository'
import { EntProductsResolver } from './ent-product.resolver'
import { EntProductsService } from './ent-product.service'

@Module({
  imports: [TypeOrmModule.forFeature([EntProduct, EntProductsRepository])],
  providers: [EntProductsService, EntProductsResolver],
})
export class EntProductsModule {}
