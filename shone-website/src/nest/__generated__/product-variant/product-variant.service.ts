/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<lmsbbg4inMjDP8GWvuK0MY85JlDyVhNy>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateProductVariantDto } from './create-product-variant.dto'
import { ProductVariant } from './product-variant.entity'
import { ProductVariantsRepository } from './product-variant.repository'

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly ProductVariantsRepository: ProductVariantsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.ProductVariantsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<ProductVariant> {
    const ProductVariant = await this.ProductVariantsRepository.findOne(entId)
    if (!ProductVariant) {
      throw new NotFoundException(`ProductVariant entId: ${entId} not found`)
    }
    return ProductVariant
  }

  async getCreatedAfter(createdAfter: Date): Promise<ProductVariant[]> {
    return await this.ProductVariantsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createProductVariantDto: CreateProductVariantDto,
  ): Promise<ProductVariant> {
    const ProductVariant = this.ProductVariantsRepository.create(
      createProductVariantDto,
    )
    return this.ProductVariantsRepository.save(ProductVariant, {
      transaction: false,
    })
  }

  async createBulk(
    createProductVariantDto: CreateProductVariantDto[],
  ): Promise<ProductVariant[]> {
    const ProductVariant = this.ProductVariantsRepository.create(
      createProductVariantDto,
    )
    return this.ProductVariantsRepository.save(ProductVariant, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<ProductVariant> {
    const ProductVariant = await this.getByEntId(entId)
    return this.ProductVariantsRepository.softRemove(ProductVariant)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
