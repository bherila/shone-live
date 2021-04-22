/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<4VPaIMv+NVmNuvGl7/KybMphvL27eC4r>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreatePageProductDto } from './create-page-product.dto'
import { PageProduct } from './page-product.entity'
import { PageProductsRepository } from './page-product.repository'

@Injectable()
export class PageProductsService {
  constructor(
    @InjectRepository(PageProduct)
    private readonly PageProductsRepository: PageProductsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.PageProductsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<PageProduct> {
    const PageProduct = await this.PageProductsRepository.findOne(entId)
    if (!PageProduct) {
      throw new NotFoundException(`PageProduct entId: ${entId} not found`)
    }
    return PageProduct
  }

  async getCreatedAfter(createdAfter: Date): Promise<PageProduct[]> {
    return await this.PageProductsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createPageProductDto: CreatePageProductDto,
  ): Promise<PageProduct> {
    const PageProduct = this.PageProductsRepository.create(createPageProductDto)
    return this.PageProductsRepository.save(PageProduct, { transaction: false })
  }

  async createBulk(
    createPageProductDto: CreatePageProductDto[],
  ): Promise<PageProduct[]> {
    const PageProduct = this.PageProductsRepository.create(createPageProductDto)
    return this.PageProductsRepository.save(PageProduct, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<PageProduct> {
    const PageProduct = await this.getByEntId(entId)
    return this.PageProductsRepository.softRemove(PageProduct)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
