/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<lIBgg1i691X/R/zhRmr3TQXA0r4XXTus>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateProductVariantValueDto } from './create-product-variant-value.dto'
import { ProductVariantValue } from './product-variant-value.entity'
import { ProductVariantValuesRepository } from './product-variant-value.repository'

@Injectable()
export class ProductVariantValuesService {
  constructor(
    @InjectRepository(ProductVariantValue)
    private readonly ProductVariantValuesRepository: ProductVariantValuesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.ProductVariantValuesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<ProductVariantValue> {
    const ProductVariantValue = await this.ProductVariantValuesRepository.findOne(
      entId,
    )
    if (!ProductVariantValue) {
      throw new NotFoundException(
        `ProductVariantValue entId: ${entId} not found`,
      )
    }
    return ProductVariantValue
  }

  async getCreatedAfter(createdAfter: Date): Promise<ProductVariantValue[]> {
    return await this.ProductVariantValuesRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createProductVariantValueDto: CreateProductVariantValueDto,
  ): Promise<ProductVariantValue> {
    const ProductVariantValue = this.ProductVariantValuesRepository.create(
      createProductVariantValueDto,
    )
    return this.ProductVariantValuesRepository.save(ProductVariantValue, {
      transaction: false,
    })
  }

  async createBulk(
    createProductVariantValueDto: CreateProductVariantValueDto[],
  ): Promise<ProductVariantValue[]> {
    const ProductVariantValue = this.ProductVariantValuesRepository.create(
      createProductVariantValueDto,
    )
    return this.ProductVariantValuesRepository.save(ProductVariantValue, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<ProductVariantValue> {
    const ProductVariantValue = await this.getByEntId(entId)
    return this.ProductVariantValuesRepository.softRemove(ProductVariantValue)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
