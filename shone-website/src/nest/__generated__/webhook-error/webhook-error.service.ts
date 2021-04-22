/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<gdvG1V7g+K8Q4z5qWnkCj51K/a8LvYjb>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateWebhookErrorDto } from './create-webhook-error.dto'
import { WebhookError } from './webhook-error.entity'
import { WebhookErrorsRepository } from './webhook-error.repository'

@Injectable()
export class WebhookErrorsService {
  constructor(
    @InjectRepository(WebhookError)
    private readonly WebhookErrorsRepository: WebhookErrorsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.WebhookErrorsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<WebhookError> {
    const WebhookError = await this.WebhookErrorsRepository.findOne(entId)
    if (!WebhookError) {
      throw new NotFoundException(`WebhookError entId: ${entId} not found`)
    }
    return WebhookError
  }

  async getCreatedAfter(createdAfter: Date): Promise<WebhookError[]> {
    return await this.WebhookErrorsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createWebhookErrorDto: CreateWebhookErrorDto,
  ): Promise<WebhookError> {
    const WebhookError = this.WebhookErrorsRepository.create(
      createWebhookErrorDto,
    )
    return this.WebhookErrorsRepository.save(WebhookError, {
      transaction: false,
    })
  }

  async createBulk(
    createWebhookErrorDto: CreateWebhookErrorDto[],
  ): Promise<WebhookError[]> {
    const WebhookError = this.WebhookErrorsRepository.create(
      createWebhookErrorDto,
    )
    return this.WebhookErrorsRepository.save(WebhookError, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<WebhookError> {
    const WebhookError = await this.getByEntId(entId)
    return this.WebhookErrorsRepository.softRemove(WebhookError)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
