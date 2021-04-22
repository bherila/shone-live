/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<lVetZhlsiH6GOq/TCQcds7WIRZXMeElX>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CartPaymentMethodsRepository } from './cart-payment-method.repository'
import { CreateCartPaymentMethodDto } from './create-cart-payment-method.dto'
import { CartPaymentMethod } from './cart-payment-method.entity'

@Injectable()
export class CartPaymentMethodsService {
  constructor(
    @InjectRepository(CartPaymentMethod)
    private readonly CartPaymentMethodsRepository: CartPaymentMethodsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.CartPaymentMethodsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<CartPaymentMethod> {
    const CartPaymentMethod = await this.CartPaymentMethodsRepository.findOne(
      entId,
    )
    if (!CartPaymentMethod) {
      throw new NotFoundException(`CartPaymentMethod entId: ${entId} not found`)
    }
    return CartPaymentMethod
  }

  async getCreatedAfter(createdAfter: Date): Promise<CartPaymentMethod[]> {
    return await this.CartPaymentMethodsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createCartPaymentMethodDto: CreateCartPaymentMethodDto,
  ): Promise<CartPaymentMethod> {
    const CartPaymentMethod = this.CartPaymentMethodsRepository.create(
      createCartPaymentMethodDto,
    )
    return this.CartPaymentMethodsRepository.save(CartPaymentMethod, {
      transaction: false,
    })
  }

  async createBulk(
    createCartPaymentMethodDto: CreateCartPaymentMethodDto[],
  ): Promise<CartPaymentMethod[]> {
    const CartPaymentMethod = this.CartPaymentMethodsRepository.create(
      createCartPaymentMethodDto,
    )
    return this.CartPaymentMethodsRepository.save(CartPaymentMethod, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<CartPaymentMethod> {
    const CartPaymentMethod = await this.getByEntId(entId)
    return this.CartPaymentMethodsRepository.softRemove(CartPaymentMethod)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
