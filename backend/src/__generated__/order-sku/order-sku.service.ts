/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<UuXrNxBaYZYMnquZMGyTccGyGBkGjQIp>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { OrderSkusRepository } from './order-sku.repository'
import { CreateOrderSkuDto } from './create-order-sku.dto'
import { OrderSku } from './order-sku.entity'

@Injectable()
export class OrderSkusService {
  constructor(
    @InjectRepository(OrderSku)
    private readonly OrderSkusRepository: OrderSkusRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.OrderSkusRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<OrderSku> {
    const OrderSku = await this.OrderSkusRepository.findOne(entId)
    if (!OrderSku) {
      throw new NotFoundException(`OrderSku entId: ${entId} not found`)
    }
    return OrderSku
  }

  async getCreatedAfter(createdAfter: Date): Promise<OrderSku[]> {
    return await this.OrderSkusRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createOrderSkuDto: CreateOrderSkuDto): Promise<OrderSku> {
    const OrderSku = this.OrderSkusRepository.create(createOrderSkuDto)
    return this.OrderSkusRepository.save(OrderSku, { transaction: false })
  }

  async createBulk(
    createOrderSkuDto: CreateOrderSkuDto[],
  ): Promise<OrderSku[]> {
    const OrderSku = this.OrderSkusRepository.create(createOrderSkuDto)
    return this.OrderSkusRepository.save(OrderSku, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<OrderSku> {
    const OrderSku = await this.getByEntId(entId)
    return this.OrderSkusRepository.softRemove(OrderSku)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
