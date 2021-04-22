/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<vdl7+JpHb0rUiA+/h3+F4Y0IyXrW2O9w>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Transaction } from './transaction.entity'
import { TransactionsRepository } from './transaction.repository'
import { TransactionsResolver } from './transaction.resolver'
import { TransactionsService } from './transaction.service'

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionsRepository])],
  providers: [TransactionsService, TransactionsResolver],
})
export class TransactionsModule {}
