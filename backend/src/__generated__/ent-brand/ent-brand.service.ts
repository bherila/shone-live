/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<72N0HR7xLmWJyXaDYhfXLp+KwftRjk8i>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { EntBrandsRepository } from './ent-brand.repository'
import { CreateEntBrandDto } from './create-ent-brand.dto'
import { EntBrand } from './ent-brand.entity'

@Injectable()
export class EntBrandsService {
  constructor(
    @InjectRepository(EntBrand)
    private readonly EntBrandsRepository: EntBrandsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.EntBrandsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<EntBrand> {
    const EntBrand = await this.EntBrandsRepository.findOne(entId)
    if (!EntBrand) {
      throw new NotFoundException(`EntBrand entId: ${entId} not found`)
    }
    return EntBrand
  }

  async getCreatedAfter(createdAfter: Date): Promise<EntBrand[]> {
    return await this.EntBrandsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createEntBrandDto: CreateEntBrandDto): Promise<EntBrand> {
    const EntBrand = this.EntBrandsRepository.create(createEntBrandDto)
    return this.EntBrandsRepository.save(EntBrand, { transaction: false })
  }

  async createBulk(
    createEntBrandDto: CreateEntBrandDto[],
  ): Promise<EntBrand[]> {
    const EntBrand = this.EntBrandsRepository.create(createEntBrandDto)
    return this.EntBrandsRepository.save(EntBrand, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<EntBrand> {
    const EntBrand = await this.getByEntId(entId)
    return this.EntBrandsRepository.softRemove(EntBrand)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
