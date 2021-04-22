/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<tRtGFfhs/vRXr3StNPq4LmblwPfqu2D6>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateEntProductDto } from './create-ent-product.dto'
import { EntProduct } from './ent-product.entity'
import { EntProductsRepository } from './ent-product.repository'

@Injectable()
export class EntProductsService {
  constructor(
    @InjectRepository(EntProduct)
    private readonly EntProductsRepository: EntProductsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.EntProductsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<EntProduct> {
    const EntProduct = await this.EntProductsRepository.findOne(entId)
    if (!EntProduct) {
      throw new NotFoundException(`EntProduct entId: ${entId} not found`)
    }
    return EntProduct
  }

  async getCreatedAfter(createdAfter: Date): Promise<EntProduct[]> {
    return await this.EntProductsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createEntProductDto: CreateEntProductDto): Promise<EntProduct> {
    const EntProduct = this.EntProductsRepository.create(createEntProductDto)
    return this.EntProductsRepository.save(EntProduct, { transaction: false })
  }

  async createBulk(
    createEntProductDto: CreateEntProductDto[],
  ): Promise<EntProduct[]> {
    const EntProduct = this.EntProductsRepository.create(createEntProductDto)
    return this.EntProductsRepository.save(EntProduct, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<EntProduct> {
    const EntProduct = await this.getByEntId(entId)
    return this.EntProductsRepository.softRemove(EntProduct)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
