/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<A3WY+CWs9JX7XBmNV5VCxsDISxQA0Qpg>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WebhookHeader } from './webhook-header.entity'
import { WebhookHeadersRepository } from './webhook-header.repository'
import { WebhookHeadersResolver } from './webhook-header.resolver'
import { WebhookHeadersService } from './webhook-header.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([WebhookHeader, WebhookHeadersRepository]),
  ],
  providers: [WebhookHeadersService, WebhookHeadersResolver],
})
export class WebhookHeadersModule {}
