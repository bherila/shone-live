/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<dDdLHrXfnLH5tiAHvj8MEEAQupuENgle>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { WebhooksRepository } from './webhook.repository'
import { CreateWebhookDto } from './create-webhook.dto'
import { Webhook } from './webhook.entity'

@Injectable()
export class WebhooksService {
  constructor(
    @InjectRepository(Webhook)
    private readonly WebhooksRepository: WebhooksRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.WebhooksRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Webhook> {
    const Webhook = await this.WebhooksRepository.findOne(entId)
    if (!Webhook) {
      throw new NotFoundException(`Webhook entId: ${entId} not found`)
    }
    return Webhook
  }

  async getCreatedAfter(createdAfter: Date): Promise<Webhook[]> {
    return await this.WebhooksRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createWebhookDto: CreateWebhookDto): Promise<Webhook> {
    const Webhook = this.WebhooksRepository.create(createWebhookDto)
    return this.WebhooksRepository.save(Webhook, { transaction: false })
  }

  async createBulk(createWebhookDto: CreateWebhookDto[]): Promise<Webhook[]> {
    const Webhook = this.WebhooksRepository.create(createWebhookDto)
    return this.WebhooksRepository.save(Webhook, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Webhook> {
    const Webhook = await this.getByEntId(entId)
    return this.WebhooksRepository.softRemove(Webhook)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
