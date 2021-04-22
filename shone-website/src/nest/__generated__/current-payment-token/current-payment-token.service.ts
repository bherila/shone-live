/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<B0ga9qjZE8Si6sAmP1fvAX6U550cEp0l>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateCurrentPaymentTokenDto } from './create-current-payment-token.dto'
import { CurrentPaymentToken } from './current-payment-token.entity'
import { CurrentPaymentTokensRepository } from './current-payment-token.repository'

@Injectable()
export class CurrentPaymentTokensService {
  constructor(
    @InjectRepository(CurrentPaymentToken)
    private readonly CurrentPaymentTokensRepository: CurrentPaymentTokensRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.CurrentPaymentTokensRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<CurrentPaymentToken> {
    const CurrentPaymentToken = await this.CurrentPaymentTokensRepository.findOne(
      entId,
    )
    if (!CurrentPaymentToken) {
      throw new NotFoundException(
        `CurrentPaymentToken entId: ${entId} not found`,
      )
    }
    return CurrentPaymentToken
  }

  async getCreatedAfter(createdAfter: Date): Promise<CurrentPaymentToken[]> {
    return await this.CurrentPaymentTokensRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createCurrentPaymentTokenDto: CreateCurrentPaymentTokenDto,
  ): Promise<CurrentPaymentToken> {
    const CurrentPaymentToken = this.CurrentPaymentTokensRepository.create(
      createCurrentPaymentTokenDto,
    )
    return this.CurrentPaymentTokensRepository.save(CurrentPaymentToken, {
      transaction: false,
    })
  }

  async createBulk(
    createCurrentPaymentTokenDto: CreateCurrentPaymentTokenDto[],
  ): Promise<CurrentPaymentToken[]> {
    const CurrentPaymentToken = this.CurrentPaymentTokensRepository.create(
      createCurrentPaymentTokenDto,
    )
    return this.CurrentPaymentTokensRepository.save(CurrentPaymentToken, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<CurrentPaymentToken> {
    const CurrentPaymentToken = await this.getByEntId(entId)
    return this.CurrentPaymentTokensRepository.softRemove(CurrentPaymentToken)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
