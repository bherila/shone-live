/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<9cIM6LFX90W/YMiOS8M4PWe7MpK7eeAf>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateEntShowDto } from './create-ent-show.dto'
import { EntShow } from './ent-show.entity'
import { EntShowsRepository } from './ent-show.repository'

@Injectable()
export class EntShowsService {
  constructor(
    @InjectRepository(EntShow)
    private readonly EntShowsRepository: EntShowsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.EntShowsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<EntShow> {
    const EntShow = await this.EntShowsRepository.findOne(entId)
    if (!EntShow) {
      throw new NotFoundException(`EntShow entId: ${entId} not found`)
    }
    return EntShow
  }

  async getCreatedAfter(createdAfter: Date): Promise<EntShow[]> {
    return await this.EntShowsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createEntShowDto: CreateEntShowDto): Promise<EntShow> {
    const EntShow = this.EntShowsRepository.create(createEntShowDto)
    return this.EntShowsRepository.save(EntShow, { transaction: false })
  }

  async createBulk(createEntShowDto: CreateEntShowDto[]): Promise<EntShow[]> {
    const EntShow = this.EntShowsRepository.create(createEntShowDto)
    return this.EntShowsRepository.save(EntShow, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<EntShow> {
    const EntShow = await this.getByEntId(entId)
    return this.EntShowsRepository.softRemove(EntShow)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
