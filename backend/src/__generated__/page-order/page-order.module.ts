/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<eW06ZnjWTyg5T+0MzJ9mY1HNtveZwPfG>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PageOrdersRepository } from './page-order.repository'
import { PageOrdersResolver } from './page-order.resolver'
import { PageOrdersService } from './page-order.service'
import { PageOrder } from './page-order.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PageOrder, PageOrdersRepository])],
  providers: [PageOrdersService, PageOrdersResolver],
})
export class PageOrdersModule {}
