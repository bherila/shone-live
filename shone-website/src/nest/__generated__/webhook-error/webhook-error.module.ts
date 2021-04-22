/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<oA21icvGWK5YPeg8+tAC9/OHjv+jeG8Q>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WebhookError } from './webhook-error.entity'
import { WebhookErrorsRepository } from './webhook-error.repository'
import { WebhookErrorsResolver } from './webhook-error.resolver'
import { WebhookErrorsService } from './webhook-error.service'

@Module({
  imports: [TypeOrmModule.forFeature([WebhookError, WebhookErrorsRepository])],
  providers: [WebhookErrorsService, WebhookErrorsResolver],
})
export class WebhookErrorsModule {}
