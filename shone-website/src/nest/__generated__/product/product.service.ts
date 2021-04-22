/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<+mIpPMkaHMX9SOrPfHcSOjxYA+DKvgiw>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateProductDto } from './create-product.dto'
import { Product } from './product.entity'
import { ProductsRepository } from './product.repository'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductsRepository: ProductsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.ProductsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Product> {
    const Product = await this.ProductsRepository.findOne(entId)
    if (!Product) {
      throw new NotFoundException(`Product entId: ${entId} not found`)
    }
    return Product
  }

  async getCreatedAfter(createdAfter: Date): Promise<Product[]> {
    return await this.ProductsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const Product = this.ProductsRepository.create(createProductDto)
    return this.ProductsRepository.save(Product, { transaction: false })
  }

  async createBulk(createProductDto: CreateProductDto[]): Promise<Product[]> {
    const Product = this.ProductsRepository.create(createProductDto)
    return this.ProductsRepository.save(Product, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Product> {
    const Product = await this.getByEntId(entId)
    return this.ProductsRepository.softRemove(Product)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
