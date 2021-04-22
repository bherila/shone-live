/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<sRIqvJv27jvuO96AUaQb5cnge9aA+p9a>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateDimensionDto } from './create-dimension.dto'
import { Dimension } from './dimension.entity'
import { DimensionsRepository } from './dimension.repository'

@Injectable()
export class DimensionsService {
  constructor(
    @InjectRepository(Dimension)
    private readonly DimensionsRepository: DimensionsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.DimensionsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Dimension> {
    const Dimension = await this.DimensionsRepository.findOne(entId)
    if (!Dimension) {
      throw new NotFoundException(`Dimension entId: ${entId} not found`)
    }
    return Dimension
  }

  async getCreatedAfter(createdAfter: Date): Promise<Dimension[]> {
    return await this.DimensionsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createDimensionDto: CreateDimensionDto): Promise<Dimension> {
    const Dimension = this.DimensionsRepository.create(createDimensionDto)
    return this.DimensionsRepository.save(Dimension, { transaction: false })
  }

  async createBulk(
    createDimensionDto: CreateDimensionDto[],
  ): Promise<Dimension[]> {
    const Dimension = this.DimensionsRepository.create(createDimensionDto)
    return this.DimensionsRepository.save(Dimension, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Dimension> {
    const Dimension = await this.getByEntId(entId)
    return this.DimensionsRepository.softRemove(Dimension)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
