import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { Product } from '../products/entities/product.entity'
import { ProductRepository } from '../products/products.repository'
import { SkusService } from '../skus/skus.service'
import { CreateVariantDto } from './dto/create-variant.dto'
import { UpdateVariantDto } from './dto/update-variant.dto'
import { Variant } from './entities/variant.entity'
import { VariantRepository } from './variants.repository'

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
    @InjectRepository(Variant)
    private readonly variantRepository: VariantRepository,
    private readonly skusService: SkusService,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.variantRepository.find({
      relations: ['skus', 'product'],
      skip: offset,
      take: limit,
    })
  }

  async findByProduct(paginationQuery: PaginationQueryDto, productId: string) {
    const { limit, offset } = paginationQuery
    return this.variantRepository.find({
      where: { product: { id: productId } },
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: string) {
    return await this.variantRepository.findOrFail(id)
  }

  async create({ productId, skuData, ...createVariantDto }: CreateVariantDto) {
    const product = await this.productRepository.findOrFail(productId)
    const variant = this.variantRepository.create({
      product,
      ...createVariantDto,
    })
    const savedVariant = await this.variantRepository.save(variant)
    await this.variantRepository.findOrFail(savedVariant.id)
    await this.skusService.create({
      variantId: savedVariant.id,
      ...skuData,
    })
    return savedVariant
  }

  async update({ id, description, name }: UpdateVariantDto) {
    await this.variantRepository.update(id, {
      description,
      name,
    })
    return await this.findOne(id)
  }

  async remove(id: string) {
    const variant = await this.findOne(id)
    return this.variantRepository.remove(variant)
  }
}
