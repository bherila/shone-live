/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<u16/1eToOCesU0yf161SMyw1OKc2mIWV>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CustomerAddressesRepository } from './customer-address.repository'
import { CreateCustomerAddressDto } from './create-customer-address.dto'
import { CustomerAddress } from './customer-address.entity'

@Injectable()
export class CustomerAddressesService {
  constructor(
    @InjectRepository(CustomerAddress)
    private readonly CustomerAddressesRepository: CustomerAddressesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.CustomerAddressesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<CustomerAddress> {
    const CustomerAddress = await this.CustomerAddressesRepository.findOne(
      entId,
    )
    if (!CustomerAddress) {
      throw new NotFoundException(`CustomerAddress entId: ${entId} not found`)
    }
    return CustomerAddress
  }

  async getCreatedAfter(createdAfter: Date): Promise<CustomerAddress[]> {
    return await this.CustomerAddressesRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createCustomerAddressDto: CreateCustomerAddressDto,
  ): Promise<CustomerAddress> {
    const CustomerAddress = this.CustomerAddressesRepository.create(
      createCustomerAddressDto,
    )
    return this.CustomerAddressesRepository.save(CustomerAddress, {
      transaction: false,
    })
  }

  async createBulk(
    createCustomerAddressDto: CreateCustomerAddressDto[],
  ): Promise<CustomerAddress[]> {
    const CustomerAddress = this.CustomerAddressesRepository.create(
      createCustomerAddressDto,
    )
    return this.CustomerAddressesRepository.save(CustomerAddress, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<CustomerAddress> {
    const CustomerAddress = await this.getByEntId(entId)
    return this.CustomerAddressesRepository.softRemove(CustomerAddress)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
