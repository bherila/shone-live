/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<fGOgedAuQzY28pCJMC6MzbpGdEQJjbQM>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WebhooksRepository } from './webhook.repository'
import { WebhooksResolver } from './webhook.resolver'
import { WebhooksService } from './webhook.service'
import { Webhook } from './webhook.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Webhook, WebhooksRepository])],
  providers: [WebhooksService, WebhooksResolver],
})
export class WebhooksModule {}
