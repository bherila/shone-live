/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<EAiBBrCZdy+z1ic//qxf58ZnDpQXo1Gu>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { PageOrdersRepository } from './page-order.repository'
import { CreatePageOrderDto } from './create-page-order.dto'
import { PageOrder } from './page-order.entity'

@Injectable()
export class PageOrdersService {
  constructor(
    @InjectRepository(PageOrder)
    private readonly PageOrdersRepository: PageOrdersRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.PageOrdersRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<PageOrder> {
    const PageOrder = await this.PageOrdersRepository.findOne(entId)
    if (!PageOrder) {
      throw new NotFoundException(`PageOrder entId: ${entId} not found`)
    }
    return PageOrder
  }

  async getCreatedAfter(createdAfter: Date): Promise<PageOrder[]> {
    return await this.PageOrdersRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createPageOrderDto: CreatePageOrderDto): Promise<PageOrder> {
    const PageOrder = this.PageOrdersRepository.create(createPageOrderDto)
    return this.PageOrdersRepository.save(PageOrder, { transaction: false })
  }

  async createBulk(
    createPageOrderDto: CreatePageOrderDto[],
  ): Promise<PageOrder[]> {
    const PageOrder = this.PageOrdersRepository.create(createPageOrderDto)
    return this.PageOrdersRepository.save(PageOrder, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<PageOrder> {
    const PageOrder = await this.getByEntId(entId)
    return this.PageOrdersRepository.softRemove(PageOrder)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
