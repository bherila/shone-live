/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<gwfRjy0N4mes0PT6RmLYH05ec2CgPyWq>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BagsRepository } from './bag.repository'
import { BagsResolver } from './bag.resolver'
import { BagsService } from './bag.service'
import { Bag } from './bag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Bag, BagsRepository])],
  providers: [BagsService, BagsResolver],
})
export class BagsModule {}
