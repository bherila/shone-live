import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConsumerLeadsRepository } from './consumer-leads.repository'
import { ConsumerLeadsResolver } from './consumer-leads.resolver'
import { ConsumerLeadsService } from './consumer-leads.service'
import { ConsumerLead } from './entities/consumer-lead.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ConsumerLead, ConsumerLeadsRepository])],
  providers: [ConsumerLeadsService, ConsumerLeadsResolver],
})
export class ConsumerLeadsModule {}
