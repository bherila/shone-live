/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<aDsgtTo5QFEYNV3s50yuVXn8TtbY7wCP>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateTransactionDto } from './create-transaction.dto'
import { Transaction } from './transaction.entity'
import { TransactionsRepository } from './transaction.repository'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly TransactionsRepository: TransactionsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.TransactionsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Transaction> {
    const Transaction = await this.TransactionsRepository.findOne(entId)
    if (!Transaction) {
      throw new NotFoundException(`Transaction entId: ${entId} not found`)
    }
    return Transaction
  }

  async getCreatedAfter(createdAfter: Date): Promise<Transaction[]> {
    return await this.TransactionsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const Transaction = this.TransactionsRepository.create(createTransactionDto)
    return this.TransactionsRepository.save(Transaction, { transaction: false })
  }

  async createBulk(
    createTransactionDto: CreateTransactionDto[],
  ): Promise<Transaction[]> {
    const Transaction = this.TransactionsRepository.create(createTransactionDto)
    return this.TransactionsRepository.save(Transaction, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Transaction> {
    const Transaction = await this.getByEntId(entId)
    return this.TransactionsRepository.softRemove(Transaction)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
