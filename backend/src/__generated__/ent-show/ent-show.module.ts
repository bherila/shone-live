/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<oHsV3k1e3Gm+LPU7HFKA4laVNue9AuFG>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EntShowsRepository } from './ent-show.repository'
import { EntShowsResolver } from './ent-show.resolver'
import { EntShowsService } from './ent-show.service'
import { EntShow } from './ent-show.entity'

@Module({
  imports: [TypeOrmModule.forFeature([EntShow, EntShowsRepository])],
  providers: [EntShowsService, EntShowsResolver],
})
export class EntShowsModule {}
