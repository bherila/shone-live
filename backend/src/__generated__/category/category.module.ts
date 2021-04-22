/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<</tK7nheR9uHLgbvltsWu+gGKHouIpspU>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoriesRepository } from './category.repository'
import { CategoriesResolver } from './category.resolver'
import { CategoriesService } from './category.service'
import { Category } from './category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoriesRepository])],
  providers: [CategoriesService, CategoriesResolver],
})
export class CategoriesModule {}
