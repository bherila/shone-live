/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<qo3T17c08Mvd0kv/g8LOF9x7mmN9oP7U>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { VariantsRepository } from './variant.repository'
import { VariantsResolver } from './variant.resolver'
import { VariantsService } from './variant.service'
import { Variant } from './variant.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Variant, VariantsRepository])],
  providers: [VariantsService, VariantsResolver],
})
export class VariantsModule {}
