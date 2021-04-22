/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<dLJq5slwLgol69qv7JlUorYnVeMtM3E1>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Sort } from './sort.entity'
import { SortsRepository } from './sort.repository'
import { SortsResolver } from './sort.resolver'
import { SortsService } from './sort.service'

@Module({
  imports: [TypeOrmModule.forFeature([Sort, SortsRepository])],
  providers: [SortsService, SortsResolver],
})
export class SortsModule {}
