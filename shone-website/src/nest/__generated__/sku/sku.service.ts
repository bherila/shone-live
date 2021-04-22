/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<0lwPfKw6qRv9T+hB12ma5cqJFJHFkV3T>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateSkuDto } from './create-sku.dto'
import { Sku } from './sku.entity'
import { SkusRepository } from './sku.repository'

@Injectable()
export class SkusService {
  constructor(
    @InjectRepository(Sku)
    private readonly SkusRepository: SkusRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.SkusRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Sku> {
    const Sku = await this.SkusRepository.findOne(entId)
    if (!Sku) {
      throw new NotFoundException(`Sku entId: ${entId} not found`)
    }
    return Sku
  }

  async getCreatedAfter(createdAfter: Date): Promise<Sku[]> {
    return await this.SkusRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createSkuDto: CreateSkuDto): Promise<Sku> {
    const Sku = this.SkusRepository.create(createSkuDto)
    return this.SkusRepository.save(Sku, { transaction: false })
  }

  async createBulk(createSkuDto: CreateSkuDto[]): Promise<Sku[]> {
    const Sku = this.SkusRepository.create(createSkuDto)
    return this.SkusRepository.save(Sku, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Sku> {
    const Sku = await this.getByEntId(entId)
    return this.SkusRepository.softRemove(Sku)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
