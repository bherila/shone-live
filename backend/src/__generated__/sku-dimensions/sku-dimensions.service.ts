/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<46+qP4q1jrmI0xPqX+WQ705+htiMon0K>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { SkuDimensionsRepository } from './sku-dimensions.repository'
import { CreateSkuDimensionsDto } from './create-sku-dimensions.dto'
import { SkuDimensions } from './sku-dimensions.entity'

@Injectable()
export class SkuDimensionsService {
  constructor(
    @InjectRepository(SkuDimensions)
    private readonly SkuDimensionsRepository: SkuDimensionsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.SkuDimensionsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<SkuDimensions> {
    const SkuDimensions = await this.SkuDimensionsRepository.findOne(entId)
    if (!SkuDimensions) {
      throw new NotFoundException(`SkuDimensions entId: ${entId} not found`)
    }
    return SkuDimensions
  }

  async getCreatedAfter(createdAfter: Date): Promise<SkuDimensions[]> {
    return await this.SkuDimensionsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createSkuDimensionsDto: CreateSkuDimensionsDto,
  ): Promise<SkuDimensions> {
    const SkuDimensions = this.SkuDimensionsRepository.create(
      createSkuDimensionsDto,
    )
    return this.SkuDimensionsRepository.save(SkuDimensions, {
      transaction: false,
    })
  }

  async createBulk(
    createSkuDimensionsDto: CreateSkuDimensionsDto[],
  ): Promise<SkuDimensions[]> {
    const SkuDimensions = this.SkuDimensionsRepository.create(
      createSkuDimensionsDto,
    )
    return this.SkuDimensionsRepository.save(SkuDimensions, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<SkuDimensions> {
    const SkuDimensions = await this.getByEntId(entId)
    return this.SkuDimensionsRepository.softRemove(SkuDimensions)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
