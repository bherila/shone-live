/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<URJs5Z4/WZJskdjZeb7xR5F5tp6LWjBG>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateOrderDto } from './create-order.dto'
import { Order } from './order.entity'
import { OrdersRepository } from './order.repository'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly OrdersRepository: OrdersRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.OrdersRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Order> {
    const Order = await this.OrdersRepository.findOne(entId)
    if (!Order) {
      throw new NotFoundException(`Order entId: ${entId} not found`)
    }
    return Order
  }

  async getCreatedAfter(createdAfter: Date): Promise<Order[]> {
    return await this.OrdersRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const Order = this.OrdersRepository.create(createOrderDto)
    return this.OrdersRepository.save(Order, { transaction: false })
  }

  async createBulk(createOrderDto: CreateOrderDto[]): Promise<Order[]> {
    const Order = this.OrdersRepository.create(createOrderDto)
    return this.OrdersRepository.save(Order, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Order> {
    const Order = await this.getByEntId(entId)
    return this.OrdersRepository.softRemove(Order)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
