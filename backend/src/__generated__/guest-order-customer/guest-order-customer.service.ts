/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<H9hy4535+K6MYMkGP6C3piQZpfXQpS2A>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { GuestOrderCustomersRepository } from './guest-order-customer.repository'
import { CreateGuestOrderCustomerDto } from './create-guest-order-customer.dto'
import { GuestOrderCustomer } from './guest-order-customer.entity'

@Injectable()
export class GuestOrderCustomersService {
  constructor(
    @InjectRepository(GuestOrderCustomer)
    private readonly GuestOrderCustomersRepository: GuestOrderCustomersRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.GuestOrderCustomersRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<GuestOrderCustomer> {
    const GuestOrderCustomer = await this.GuestOrderCustomersRepository.findOne(
      entId,
    )
    if (!GuestOrderCustomer) {
      throw new NotFoundException(
        `GuestOrderCustomer entId: ${entId} not found`,
      )
    }
    return GuestOrderCustomer
  }

  async getCreatedAfter(createdAfter: Date): Promise<GuestOrderCustomer[]> {
    return await this.GuestOrderCustomersRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createGuestOrderCustomerDto: CreateGuestOrderCustomerDto,
  ): Promise<GuestOrderCustomer> {
    const GuestOrderCustomer = this.GuestOrderCustomersRepository.create(
      createGuestOrderCustomerDto,
    )
    return this.GuestOrderCustomersRepository.save(GuestOrderCustomer, {
      transaction: false,
    })
  }

  async createBulk(
    createGuestOrderCustomerDto: CreateGuestOrderCustomerDto[],
  ): Promise<GuestOrderCustomer[]> {
    const GuestOrderCustomer = this.GuestOrderCustomersRepository.create(
      createGuestOrderCustomerDto,
    )
    return this.GuestOrderCustomersRepository.save(GuestOrderCustomer, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<GuestOrderCustomer> {
    const GuestOrderCustomer = await this.getByEntId(entId)
    return this.GuestOrderCustomersRepository.softRemove(GuestOrderCustomer)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
