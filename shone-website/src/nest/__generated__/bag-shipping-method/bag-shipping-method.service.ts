/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<</VjejXhp1UFbSnIco2wiI7sXrZ3MLxz4>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { BagShippingMethod } from './bag-shipping-method.entity'
import { BagShippingMethodsRepository } from './bag-shipping-method.repository'
import { CreateBagShippingMethodDto } from './create-bag-shipping-method.dto'

@Injectable()
export class BagShippingMethodsService {
  constructor(
    @InjectRepository(BagShippingMethod)
    private readonly BagShippingMethodsRepository: BagShippingMethodsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.BagShippingMethodsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<BagShippingMethod> {
    const BagShippingMethod = await this.BagShippingMethodsRepository.findOne(
      entId,
    )
    if (!BagShippingMethod) {
      throw new NotFoundException(`BagShippingMethod entId: ${entId} not found`)
    }
    return BagShippingMethod
  }

  async getCreatedAfter(createdAfter: Date): Promise<BagShippingMethod[]> {
    return await this.BagShippingMethodsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createBagShippingMethodDto: CreateBagShippingMethodDto,
  ): Promise<BagShippingMethod> {
    const BagShippingMethod = this.BagShippingMethodsRepository.create(
      createBagShippingMethodDto,
    )
    return this.BagShippingMethodsRepository.save(BagShippingMethod, {
      transaction: false,
    })
  }

  async createBulk(
    createBagShippingMethodDto: CreateBagShippingMethodDto[],
  ): Promise<BagShippingMethod[]> {
    const BagShippingMethod = this.BagShippingMethodsRepository.create(
      createBagShippingMethodDto,
    )
    return this.BagShippingMethodsRepository.save(BagShippingMethod, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<BagShippingMethod> {
    const BagShippingMethod = await this.getByEntId(entId)
    return this.BagShippingMethodsRepository.softRemove(BagShippingMethod)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
