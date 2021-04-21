/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<92G9ISS957nwNqd5fA1JaCA+PVSyPWoC>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SkusRepository } from './sku.repository'
import { SkusResolver } from './sku.resolver'
import { SkusService } from './sku.service'
import { Sku } from './sku.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Sku, SkusRepository])],
  providers: [SkusService, SkusResolver],
})
export class SkusModule {}
