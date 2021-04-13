import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { ConsumerLeadsRepository } from './consumer-leads.repository'
import { CreateConsumerLeadDto } from './dto/create-consumer-lead.dto'
import { ConsumerLead } from './entities/consumer-lead.entity'

@Injectable()
export class ConsumerLeadsService {
  constructor(
    @InjectRepository(ConsumerLead)
    private readonly consumerLeadsRepository: ConsumerLeadsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.consumerLeadsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: number) {
    const consumerLead = await this.consumerLeadsRepository.findOne(id)
    if (!consumerLead) {
      throw new NotFoundException(`Consumer Lead id: ${id} not found`)
    }
    return consumerLead
  }

  async create(createConsumerLeadDto: CreateConsumerLeadDto) {
    const consumerLead = this.consumerLeadsRepository.create(
      createConsumerLeadDto,
    )
    const savedConsumerLead = await this.consumerLeadsRepository.save(
      consumerLead,
    )
    return savedConsumerLead
  }

  async remove(id: number) {
    const consumerLead = await this.findOne(id)
    return this.consumerLeadsRepository.remove(consumerLead)
  }
}
