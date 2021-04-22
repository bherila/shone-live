/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<RkECI5jynEYvTfmSWYCsW1BEoJuLDWJ6>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateOrderSearchRequestDto } from './create-order-search-request.dto'
import { OrderSearchRequest } from './order-search-request.entity'
import { OrderSearchRequestsRepository } from './order-search-request.repository'

@Injectable()
export class OrderSearchRequestsService {
  constructor(
    @InjectRepository(OrderSearchRequest)
    private readonly OrderSearchRequestsRepository: OrderSearchRequestsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.OrderSearchRequestsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<OrderSearchRequest> {
    const OrderSearchRequest = await this.OrderSearchRequestsRepository.findOne(
      entId,
    )
    if (!OrderSearchRequest) {
      throw new NotFoundException(
        `OrderSearchRequest entId: ${entId} not found`,
      )
    }
    return OrderSearchRequest
  }

  async getCreatedAfter(createdAfter: Date): Promise<OrderSearchRequest[]> {
    return await this.OrderSearchRequestsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createOrderSearchRequestDto: CreateOrderSearchRequestDto,
  ): Promise<OrderSearchRequest> {
    const OrderSearchRequest = this.OrderSearchRequestsRepository.create(
      createOrderSearchRequestDto,
    )
    return this.OrderSearchRequestsRepository.save(OrderSearchRequest, {
      transaction: false,
    })
  }

  async createBulk(
    createOrderSearchRequestDto: CreateOrderSearchRequestDto[],
  ): Promise<OrderSearchRequest[]> {
    const OrderSearchRequest = this.OrderSearchRequestsRepository.create(
      createOrderSearchRequestDto,
    )
    return this.OrderSearchRequestsRepository.save(OrderSearchRequest, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<OrderSearchRequest> {
    const OrderSearchRequest = await this.getByEntId(entId)
    return this.OrderSearchRequestsRepository.softRemove(OrderSearchRequest)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
