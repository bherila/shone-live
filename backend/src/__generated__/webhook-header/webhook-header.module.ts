/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<A3WY+CWs9JX7XBmNV5VCxsDISxQA0Qpg>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WebhookHeadersRepository } from './webhook-header.repository'
import { WebhookHeadersResolver } from './webhook-header.resolver'
import { WebhookHeadersService } from './webhook-header.service'
import { WebhookHeader } from './webhook-header.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([WebhookHeader, WebhookHeadersRepository]),
  ],
  providers: [WebhookHeadersService, WebhookHeadersResolver],
})
export class WebhookHeadersModule {}
