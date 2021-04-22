/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<5EMTCdiTBoheOBwM7wlKz2t9tnooGBgk>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateOrderShippingMethodDto } from './create-order-shipping-method.dto'
import { OrderShippingMethod } from './order-shipping-method.entity'
import { OrderShippingMethodsRepository } from './order-shipping-method.repository'

@Injectable()
export class OrderShippingMethodsService {
  constructor(
    @InjectRepository(OrderShippingMethod)
    private readonly OrderShippingMethodsRepository: OrderShippingMethodsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.OrderShippingMethodsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<OrderShippingMethod> {
    const OrderShippingMethod = await this.OrderShippingMethodsRepository.findOne(
      entId,
    )
    if (!OrderShippingMethod) {
      throw new NotFoundException(
        `OrderShippingMethod entId: ${entId} not found`,
      )
    }
    return OrderShippingMethod
  }

  async getCreatedAfter(createdAfter: Date): Promise<OrderShippingMethod[]> {
    return await this.OrderShippingMethodsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createOrderShippingMethodDto: CreateOrderShippingMethodDto,
  ): Promise<OrderShippingMethod> {
    const OrderShippingMethod = this.OrderShippingMethodsRepository.create(
      createOrderShippingMethodDto,
    )
    return this.OrderShippingMethodsRepository.save(OrderShippingMethod, {
      transaction: false,
    })
  }

  async createBulk(
    createOrderShippingMethodDto: CreateOrderShippingMethodDto[],
  ): Promise<OrderShippingMethod[]> {
    const OrderShippingMethod = this.OrderShippingMethodsRepository.create(
      createOrderShippingMethodDto,
    )
    return this.OrderShippingMethodsRepository.save(OrderShippingMethod, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<OrderShippingMethod> {
    const OrderShippingMethod = await this.getByEntId(entId)
    return this.OrderShippingMethodsRepository.softRemove(OrderShippingMethod)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
