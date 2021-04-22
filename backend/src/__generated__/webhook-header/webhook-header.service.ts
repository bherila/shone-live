/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<OZMcbo9gVafeWms1Cmwxpmd06i+hnzy2>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { WebhookHeadersRepository } from './webhook-header.repository'
import { CreateWebhookHeaderDto } from './create-webhook-header.dto'
import { WebhookHeader } from './webhook-header.entity'

@Injectable()
export class WebhookHeadersService {
  constructor(
    @InjectRepository(WebhookHeader)
    private readonly WebhookHeadersRepository: WebhookHeadersRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.WebhookHeadersRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<WebhookHeader> {
    const WebhookHeader = await this.WebhookHeadersRepository.findOne(entId)
    if (!WebhookHeader) {
      throw new NotFoundException(`WebhookHeader entId: ${entId} not found`)
    }
    return WebhookHeader
  }

  async getCreatedAfter(createdAfter: Date): Promise<WebhookHeader[]> {
    return await this.WebhookHeadersRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createWebhookHeaderDto: CreateWebhookHeaderDto,
  ): Promise<WebhookHeader> {
    const WebhookHeader = this.WebhookHeadersRepository.create(
      createWebhookHeaderDto,
    )
    return this.WebhookHeadersRepository.save(WebhookHeader, {
      transaction: false,
    })
  }

  async createBulk(
    createWebhookHeaderDto: CreateWebhookHeaderDto[],
  ): Promise<WebhookHeader[]> {
    const WebhookHeader = this.WebhookHeadersRepository.create(
      createWebhookHeaderDto,
    )
    return this.WebhookHeadersRepository.save(WebhookHeader, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<WebhookHeader> {
    const WebhookHeader = await this.getByEntId(entId)
    return this.WebhookHeadersRepository.softRemove(WebhookHeader)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
