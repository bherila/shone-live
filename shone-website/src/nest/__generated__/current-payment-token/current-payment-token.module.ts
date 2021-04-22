/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<rddVmeabIv+eIjMaeM2YVjxXx/1zgjZb>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CurrentPaymentToken } from './current-payment-token.entity'
import { CurrentPaymentTokensRepository } from './current-payment-token.repository'
import { CurrentPaymentTokensResolver } from './current-payment-token.resolver'
import { CurrentPaymentTokensService } from './current-payment-token.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CurrentPaymentToken,
      CurrentPaymentTokensRepository,
    ]),
  ],
  providers: [CurrentPaymentTokensService, CurrentPaymentTokensResolver],
})
export class CurrentPaymentTokensModule {}
