/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<u9/tIiRk/A332h/ZSmYrpmk1dF/KU1uI>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateOrderAddressDto } from './create-order-address.dto'
import { OrderAddress } from './order-address.entity'
import { OrderAddressesRepository } from './order-address.repository'

@Injectable()
export class OrderAddressesService {
  constructor(
    @InjectRepository(OrderAddress)
    private readonly OrderAddressesRepository: OrderAddressesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.OrderAddressesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<OrderAddress> {
    const OrderAddress = await this.OrderAddressesRepository.findOne(entId)
    if (!OrderAddress) {
      throw new NotFoundException(`OrderAddress entId: ${entId} not found`)
    }
    return OrderAddress
  }

  async getCreatedAfter(createdAfter: Date): Promise<OrderAddress[]> {
    return await this.OrderAddressesRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createOrderAddressDto: CreateOrderAddressDto,
  ): Promise<OrderAddress> {
    const OrderAddress = this.OrderAddressesRepository.create(
      createOrderAddressDto,
    )
    return this.OrderAddressesRepository.save(OrderAddress, {
      transaction: false,
    })
  }

  async createBulk(
    createOrderAddressDto: CreateOrderAddressDto[],
  ): Promise<OrderAddress[]> {
    const OrderAddress = this.OrderAddressesRepository.create(
      createOrderAddressDto,
    )
    return this.OrderAddressesRepository.save(OrderAddress, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<OrderAddress> {
    const OrderAddress = await this.getByEntId(entId)
    return this.OrderAddressesRepository.softRemove(OrderAddress)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
