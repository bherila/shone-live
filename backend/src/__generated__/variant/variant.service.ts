/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<h0iXo6ebHREEn1eLJMQbNMc9BqN2OSG6>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { VariantsRepository } from './variant.repository'
import { CreateVariantDto } from './create-variant.dto'
import { Variant } from './variant.entity'

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(Variant)
    private readonly VariantsRepository: VariantsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.VariantsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Variant> {
    const Variant = await this.VariantsRepository.findOne(entId)
    if (!Variant) {
      throw new NotFoundException(`Variant entId: ${entId} not found`)
    }
    return Variant
  }

  async getCreatedAfter(createdAfter: Date): Promise<Variant[]> {
    return await this.VariantsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createVariantDto: CreateVariantDto): Promise<Variant> {
    const Variant = this.VariantsRepository.create(createVariantDto)
    return this.VariantsRepository.save(Variant, { transaction: false })
  }

  async createBulk(createVariantDto: CreateVariantDto[]): Promise<Variant[]> {
    const Variant = this.VariantsRepository.create(createVariantDto)
    return this.VariantsRepository.save(Variant, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Variant> {
    const Variant = await this.getByEntId(entId)
    return this.VariantsRepository.softRemove(Variant)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
