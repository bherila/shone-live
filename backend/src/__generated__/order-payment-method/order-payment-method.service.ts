/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ypiFgOinIRP8Uuyi6iy4Feo4lbxGdePa>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { OrderPaymentMethodsRepository } from './order-payment-method.repository'
import { CreateOrderPaymentMethodDto } from './create-order-payment-method.dto'
import { OrderPaymentMethod } from './order-payment-method.entity'

@Injectable()
export class OrderPaymentMethodsService {
  constructor(
    @InjectRepository(OrderPaymentMethod)
    private readonly OrderPaymentMethodsRepository: OrderPaymentMethodsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.OrderPaymentMethodsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<OrderPaymentMethod> {
    const OrderPaymentMethod = await this.OrderPaymentMethodsRepository.findOne(
      entId,
    )
    if (!OrderPaymentMethod) {
      throw new NotFoundException(
        `OrderPaymentMethod entId: ${entId} not found`,
      )
    }
    return OrderPaymentMethod
  }

  async getCreatedAfter(createdAfter: Date): Promise<OrderPaymentMethod[]> {
    return await this.OrderPaymentMethodsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createOrderPaymentMethodDto: CreateOrderPaymentMethodDto,
  ): Promise<OrderPaymentMethod> {
    const OrderPaymentMethod = this.OrderPaymentMethodsRepository.create(
      createOrderPaymentMethodDto,
    )
    return this.OrderPaymentMethodsRepository.save(OrderPaymentMethod, {
      transaction: false,
    })
  }

  async createBulk(
    createOrderPaymentMethodDto: CreateOrderPaymentMethodDto[],
  ): Promise<OrderPaymentMethod[]> {
    const OrderPaymentMethod = this.OrderPaymentMethodsRepository.create(
      createOrderPaymentMethodDto,
    )
    return this.OrderPaymentMethodsRepository.save(OrderPaymentMethod, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<OrderPaymentMethod> {
    const OrderPaymentMethod = await this.getByEntId(entId)
    return this.OrderPaymentMethodsRepository.softRemove(OrderPaymentMethod)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
