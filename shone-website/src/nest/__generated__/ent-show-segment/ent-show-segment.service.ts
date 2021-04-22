/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<KFJc1mfoaAyeqnkOR/LYvFu0ypx/gepu>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateEntShowSegmentDto } from './create-ent-show-segment.dto'
import { EntShowSegment } from './ent-show-segment.entity'
import { EntShowSegmentsRepository } from './ent-show-segment.repository'

@Injectable()
export class EntShowSegmentsService {
  constructor(
    @InjectRepository(EntShowSegment)
    private readonly EntShowSegmentsRepository: EntShowSegmentsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.EntShowSegmentsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<EntShowSegment> {
    const EntShowSegment = await this.EntShowSegmentsRepository.findOne(entId)
    if (!EntShowSegment) {
      throw new NotFoundException(`EntShowSegment entId: ${entId} not found`)
    }
    return EntShowSegment
  }

  async getCreatedAfter(createdAfter: Date): Promise<EntShowSegment[]> {
    return await this.EntShowSegmentsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createEntShowSegmentDto: CreateEntShowSegmentDto,
  ): Promise<EntShowSegment> {
    const EntShowSegment = this.EntShowSegmentsRepository.create(
      createEntShowSegmentDto,
    )
    return this.EntShowSegmentsRepository.save(EntShowSegment, {
      transaction: false,
    })
  }

  async createBulk(
    createEntShowSegmentDto: CreateEntShowSegmentDto[],
  ): Promise<EntShowSegment[]> {
    const EntShowSegment = this.EntShowSegmentsRepository.create(
      createEntShowSegmentDto,
    )
    return this.EntShowSegmentsRepository.save(EntShowSegment, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<EntShowSegment> {
    const EntShowSegment = await this.getByEntId(entId)
    return this.EntShowSegmentsRepository.softRemove(EntShowSegment)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
