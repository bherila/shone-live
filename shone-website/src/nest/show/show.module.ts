import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Show } from './entities/show.entity'
import { ShowRepository } from './show.repository'
import { ShowResolver } from './show.resolver'
import { ShowService } from './show.service'
@Module({
  imports: [TypeOrmModule.forFeature([Show, ShowRepository])],
  providers: [ShowResolver, ShowService],
})
export class ShowModule {}
