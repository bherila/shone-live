import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Show } from './entities/show.entity'
import { ShowResolver } from './show.resolver'
import { ShowService } from './show.service'
@Module({
  imports: [TypeOrmModule.forFeature([Show])],
  providers: [ShowResolver, ShowService],
})
export class ShowModule {}
