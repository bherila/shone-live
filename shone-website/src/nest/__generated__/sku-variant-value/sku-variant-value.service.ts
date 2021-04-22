/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<mu4AOBWMF7VIZENCum/bEnI1kaL3Sds1>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateSkuVariantValueDto } from './create-sku-variant-value.dto'
import { SkuVariantValue } from './sku-variant-value.entity'
import { SkuVariantValuesRepository } from './sku-variant-value.repository'

@Injectable()
export class SkuVariantValuesService {
  constructor(
    @InjectRepository(SkuVariantValue)
    private readonly SkuVariantValuesRepository: SkuVariantValuesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.SkuVariantValuesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<SkuVariantValue> {
    const SkuVariantValue = await this.SkuVariantValuesRepository.findOne(entId)
    if (!SkuVariantValue) {
      throw new NotFoundException(`SkuVariantValue entId: ${entId} not found`)
    }
    return SkuVariantValue
  }

  async getCreatedAfter(createdAfter: Date): Promise<SkuVariantValue[]> {
    return await this.SkuVariantValuesRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createSkuVariantValueDto: CreateSkuVariantValueDto,
  ): Promise<SkuVariantValue> {
    const SkuVariantValue = this.SkuVariantValuesRepository.create(
      createSkuVariantValueDto,
    )
    return this.SkuVariantValuesRepository.save(SkuVariantValue, {
      transaction: false,
    })
  }

  async createBulk(
    createSkuVariantValueDto: CreateSkuVariantValueDto[],
  ): Promise<SkuVariantValue[]> {
    const SkuVariantValue = this.SkuVariantValuesRepository.create(
      createSkuVariantValueDto,
    )
    return this.SkuVariantValuesRepository.save(SkuVariantValue, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<SkuVariantValue> {
    const SkuVariantValue = await this.getByEntId(entId)
    return this.SkuVariantValuesRepository.softRemove(SkuVariantValue)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
