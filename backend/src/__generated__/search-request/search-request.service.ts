/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<nnm98QhqLYyHpr7gsCthU1XGV0GZ23Qp>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { SearchRequestsRepository } from './search-request.repository'
import { CreateSearchRequestDto } from './create-search-request.dto'
import { SearchRequest } from './search-request.entity'

@Injectable()
export class SearchRequestsService {
  constructor(
    @InjectRepository(SearchRequest)
    private readonly SearchRequestsRepository: SearchRequestsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.SearchRequestsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<SearchRequest> {
    const SearchRequest = await this.SearchRequestsRepository.findOne(entId)
    if (!SearchRequest) {
      throw new NotFoundException(`SearchRequest entId: ${entId} not found`)
    }
    return SearchRequest
  }

  async getCreatedAfter(createdAfter: Date): Promise<SearchRequest[]> {
    return await this.SearchRequestsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createSearchRequestDto: CreateSearchRequestDto,
  ): Promise<SearchRequest> {
    const SearchRequest = this.SearchRequestsRepository.create(
      createSearchRequestDto,
    )
    return this.SearchRequestsRepository.save(SearchRequest, {
      transaction: false,
    })
  }

  async createBulk(
    createSearchRequestDto: CreateSearchRequestDto[],
  ): Promise<SearchRequest[]> {
    const SearchRequest = this.SearchRequestsRepository.create(
      createSearchRequestDto,
    )
    return this.SearchRequestsRepository.save(SearchRequest, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<SearchRequest> {
    const SearchRequest = await this.getByEntId(entId)
    return this.SearchRequestsRepository.softRemove(SearchRequest)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
