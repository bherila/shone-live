/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ywA9WtyOwSW884XBlzTlZSfcyRoPmZob>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { RefreshTokenResponsesRepository } from './refresh-token-response.repository'
import { CreateRefreshTokenResponseDto } from './create-refresh-token-response.dto'
import { RefreshTokenResponse } from './refresh-token-response.entity'

@Injectable()
export class RefreshTokenResponsesService {
  constructor(
    @InjectRepository(RefreshTokenResponse)
    private readonly RefreshTokenResponsesRepository: RefreshTokenResponsesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.RefreshTokenResponsesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<RefreshTokenResponse> {
    const RefreshTokenResponse = await this.RefreshTokenResponsesRepository.findOne(
      entId,
    )
    if (!RefreshTokenResponse) {
      throw new NotFoundException(
        `RefreshTokenResponse entId: ${entId} not found`,
      )
    }
    return RefreshTokenResponse
  }

  async getCreatedAfter(createdAfter: Date): Promise<RefreshTokenResponse[]> {
    return await this.RefreshTokenResponsesRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createRefreshTokenResponseDto: CreateRefreshTokenResponseDto,
  ): Promise<RefreshTokenResponse> {
    const RefreshTokenResponse = this.RefreshTokenResponsesRepository.create(
      createRefreshTokenResponseDto,
    )
    return this.RefreshTokenResponsesRepository.save(RefreshTokenResponse, {
      transaction: false,
    })
  }

  async createBulk(
    createRefreshTokenResponseDto: CreateRefreshTokenResponseDto[],
  ): Promise<RefreshTokenResponse[]> {
    const RefreshTokenResponse = this.RefreshTokenResponsesRepository.create(
      createRefreshTokenResponseDto,
    )
    return this.RefreshTokenResponsesRepository.save(RefreshTokenResponse, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<RefreshTokenResponse> {
    const RefreshTokenResponse = await this.getByEntId(entId)
    return this.RefreshTokenResponsesRepository.softRemove(RefreshTokenResponse)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
