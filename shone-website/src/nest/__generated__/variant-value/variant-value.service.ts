/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<IlBHDen0A/ERsazlkwJdeZL19pWA8VlI>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { VariantValuesRepository } from './variant-value.repository'
import { CreateVariantValueDto } from './create-variant-value.dto'
import { VariantValue } from './variant-value.entity'

@Injectable()
export class VariantValuesService {
  constructor(
    @InjectRepository(VariantValue)
    private readonly VariantValuesRepository: VariantValuesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.VariantValuesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<VariantValue> {
    const VariantValue = await this.VariantValuesRepository.findOne(entId)
    if (!VariantValue) {
      throw new NotFoundException(`VariantValue entId: ${entId} not found`)
    }
    return VariantValue
  }

  async getCreatedAfter(createdAfter: Date): Promise<VariantValue[]> {
    return await this.VariantValuesRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createVariantValueDto: CreateVariantValueDto,
  ): Promise<VariantValue> {
    const VariantValue = this.VariantValuesRepository.create(
      createVariantValueDto,
    )
    return this.VariantValuesRepository.save(VariantValue, {
      transaction: false,
    })
  }

  async createBulk(
    createVariantValueDto: CreateVariantValueDto[],
  ): Promise<VariantValue[]> {
    const VariantValue = this.VariantValuesRepository.create(
      createVariantValueDto,
    )
    return this.VariantValuesRepository.save(VariantValue, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<VariantValue> {
    const VariantValue = await this.getByEntId(entId)
    return this.VariantValuesRepository.softRemove(VariantValue)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
