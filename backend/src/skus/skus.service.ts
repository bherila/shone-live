import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { Variant } from '../variants/entities/variant.entity'
import { VariantRepository } from '../variants/variants.repository'
import { CreateSkuDto } from './dto/create-sku.dto'
import { UpdateSkuDto } from './dto/update-sku.dto'
import { Sku } from './entities/sku.entity'
import { SkuRepository } from './skus.repository'

@Injectable()
export class SkusService {
  constructor(
    @InjectRepository(Sku)
    private readonly skuRepository: SkuRepository,
    @InjectRepository(Variant)
    private readonly variantRepository: VariantRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.skuRepository.find({
      relations: ['variant'],
      skip: offset,
      take: limit,
    })
  }

  async findByVariant(paginationQuery: PaginationQueryDto, variantId: string) {
    const { limit, offset } = paginationQuery
    return this.skuRepository.find({
      where: { variant: { id: variantId } },
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: string) {
    return await this.skuRepository.findOrFail(id, {
      relations: ['variant'],
    })
  }

  async create({ variantId, ...createSkuDto }: CreateSkuDto) {
    const variant = await this.variantRepository.findOne(variantId)
    const sku = this.skuRepository.create({
      variant,
      ...createSkuDto,
    })
    const savedSku = await this.skuRepository.save(sku)
    return savedSku
  }

  async update({ id, ...updateSkuDto }: UpdateSkuDto) {
    await this.skuRepository.update(id, updateSkuDto)
    return await this.findOne(id)
  }

  async remove(id: string) {
    const sku = await this.findOne(id)
    return this.skuRepository.remove(sku)
  }
}
