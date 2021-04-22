/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<OncmC3QaFuK191B4w+c0U/QTr090kegF>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RefreshTokenResponse } from './refresh-token-response.entity'
import { RefreshTokenResponsesRepository } from './refresh-token-response.repository'
import { RefreshTokenResponsesResolver } from './refresh-token-response.resolver'
import { RefreshTokenResponsesService } from './refresh-token-response.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RefreshTokenResponse,
      RefreshTokenResponsesRepository,
    ]),
  ],
  providers: [RefreshTokenResponsesService, RefreshTokenResponsesResolver],
})
export class RefreshTokenResponsesModule {}
