/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<xlSgj3s+lN3ssunXNs/BCk7c7d0NajG7>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateOrderTaxDto } from './create-order-tax.dto'
import { OrderTax } from './order-tax.entity'
import { OrderTaxesRepository } from './order-tax.repository'

@Injectable()
export class OrderTaxesService {
  constructor(
    @InjectRepository(OrderTax)
    private readonly OrderTaxesRepository: OrderTaxesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.OrderTaxesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<OrderTax> {
    const OrderTax = await this.OrderTaxesRepository.findOne(entId)
    if (!OrderTax) {
      throw new NotFoundException(`OrderTax entId: ${entId} not found`)
    }
    return OrderTax
  }

  async getCreatedAfter(createdAfter: Date): Promise<OrderTax[]> {
    return await this.OrderTaxesRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createOrderTaxDto: CreateOrderTaxDto): Promise<OrderTax> {
    const OrderTax = this.OrderTaxesRepository.create(createOrderTaxDto)
    return this.OrderTaxesRepository.save(OrderTax, { transaction: false })
  }

  async createBulk(
    createOrderTaxDto: CreateOrderTaxDto[],
  ): Promise<OrderTax[]> {
    const OrderTax = this.OrderTaxesRepository.create(createOrderTaxDto)
    return this.OrderTaxesRepository.save(OrderTax, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<OrderTax> {
    const OrderTax = await this.getByEntId(entId)
    return this.OrderTaxesRepository.softRemove(OrderTax)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
