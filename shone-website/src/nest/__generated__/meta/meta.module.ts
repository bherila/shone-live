/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<+HQonztSy9KKGU3txwys1xCIk4TslC0X>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Meta } from './meta.entity'
import { MetasRepository } from './meta.repository'
import { MetasResolver } from './meta.resolver'
import { MetasService } from './meta.service'

@Module({
  imports: [TypeOrmModule.forFeature([Meta, MetasRepository])],
  providers: [MetasService, MetasResolver],
})
export class MetasModule {}
