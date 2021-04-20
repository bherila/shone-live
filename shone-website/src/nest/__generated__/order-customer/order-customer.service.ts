/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<xeZLODOGjgwyDTEMjDsOAI+RxOFU/+gY>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { OrderCustomersRepository } from './order-customer.repository'
import { CreateOrderCustomerDto } from './create-order-customer.dto'
import { OrderCustomer } from './order-customer.entity'

@Injectable()
export class OrderCustomersService {
  constructor(
    @InjectRepository(OrderCustomer)
    private readonly OrderCustomersRepository: OrderCustomersRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.OrderCustomersRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<OrderCustomer> {
    const OrderCustomer = await this.OrderCustomersRepository.findOne(entId)
    if (!OrderCustomer) {
      throw new NotFoundException(`OrderCustomer entId: ${entId} not found`)
    }
    return OrderCustomer
  }

  async getCreatedAfter(createdAfter: Date): Promise<OrderCustomer[]> {
    return await this.OrderCustomersRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createOrderCustomerDto: CreateOrderCustomerDto,
  ): Promise<OrderCustomer> {
    const OrderCustomer = this.OrderCustomersRepository.create(
      createOrderCustomerDto,
    )
    return this.OrderCustomersRepository.save(OrderCustomer, {
      transaction: false,
    })
  }

  async createBulk(
    createOrderCustomerDto: CreateOrderCustomerDto[],
  ): Promise<OrderCustomer[]> {
    const OrderCustomer = this.OrderCustomersRepository.create(
      createOrderCustomerDto,
    )
    return this.OrderCustomersRepository.save(OrderCustomer, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<OrderCustomer> {
    const OrderCustomer = await this.getByEntId(entId)
    return this.OrderCustomersRepository.softRemove(OrderCustomer)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
