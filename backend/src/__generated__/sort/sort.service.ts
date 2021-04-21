/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<1vFH2j9pLVppmM0chCs+vbCYxXHdeDSQ>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { SortsRepository } from './sort.repository'
import { CreateSortDto } from './create-sort.dto'
import { Sort } from './sort.entity'

@Injectable()
export class SortsService {
  constructor(
    @InjectRepository(Sort)
    private readonly SortsRepository: SortsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.SortsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Sort> {
    const Sort = await this.SortsRepository.findOne(entId)
    if (!Sort) {
      throw new NotFoundException(`Sort entId: ${entId} not found`)
    }
    return Sort
  }

  async getCreatedAfter(createdAfter: Date): Promise<Sort[]> {
    return await this.SortsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createSortDto: CreateSortDto): Promise<Sort> {
    const Sort = this.SortsRepository.create(createSortDto)
    return this.SortsRepository.save(Sort, { transaction: false })
  }

  async createBulk(createSortDto: CreateSortDto[]): Promise<Sort[]> {
    const Sort = this.SortsRepository.create(createSortDto)
    return this.SortsRepository.save(Sort, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Sort> {
    const Sort = await this.getByEntId(entId)
    return this.SortsRepository.softRemove(Sort)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
