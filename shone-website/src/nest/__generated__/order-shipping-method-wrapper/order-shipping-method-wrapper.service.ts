/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ZC+1FMCPHR7/sETgq/rVGPFJ1t6leVRW>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateOrderShippingMethodWrapperDto } from './create-order-shipping-method-wrapper.dto'
import { OrderShippingMethodWrapper } from './order-shipping-method-wrapper.entity'
import { OrderShippingMethodWrappersRepository } from './order-shipping-method-wrapper.repository'

@Injectable()
export class OrderShippingMethodWrappersService {
  constructor(
    @InjectRepository(OrderShippingMethodWrapper)
    private readonly OrderShippingMethodWrappersRepository: OrderShippingMethodWrappersRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.OrderShippingMethodWrappersRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<OrderShippingMethodWrapper> {
    const OrderShippingMethodWrapper = await this.OrderShippingMethodWrappersRepository.findOne(
      entId,
    )
    if (!OrderShippingMethodWrapper) {
      throw new NotFoundException(
        `OrderShippingMethodWrapper entId: ${entId} not found`,
      )
    }
    return OrderShippingMethodWrapper
  }

  async getCreatedAfter(
    createdAfter: Date,
  ): Promise<OrderShippingMethodWrapper[]> {
    return await this.OrderShippingMethodWrappersRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createOrderShippingMethodWrapperDto: CreateOrderShippingMethodWrapperDto,
  ): Promise<OrderShippingMethodWrapper> {
    const OrderShippingMethodWrapper = this.OrderShippingMethodWrappersRepository.create(
      createOrderShippingMethodWrapperDto,
    )
    return this.OrderShippingMethodWrappersRepository.save(
      OrderShippingMethodWrapper,
      { transaction: false },
    )
  }

  async createBulk(
    createOrderShippingMethodWrapperDto: CreateOrderShippingMethodWrapperDto[],
  ): Promise<OrderShippingMethodWrapper[]> {
    const OrderShippingMethodWrapper = this.OrderShippingMethodWrappersRepository.create(
      createOrderShippingMethodWrapperDto,
    )
    return this.OrderShippingMethodWrappersRepository.save(
      OrderShippingMethodWrapper,
      { transaction: false },
    )
  }

  async removeByEntId(entId: string): Promise<OrderShippingMethodWrapper> {
    const OrderShippingMethodWrapper = await this.getByEntId(entId)
    return this.OrderShippingMethodWrappersRepository.softRemove(
      OrderShippingMethodWrapper,
    )
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
