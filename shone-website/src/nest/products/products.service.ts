import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { BrandRepository } from '../brands/brands.repository'
import { Brand } from '../brands/entities/brand.entity'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { ShowSegment } from '../show-segment/entities/show-segment.entity'
import { ShowSegmentRepository } from '../show-segment/show-segments.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import { ProductRepository } from './products.repository'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(ShowSegment)
    private readonly showsegmentRepository: ShowSegmentRepository,
    @InjectRepository(Brand)
    private readonly brandRepository: BrandRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.productRepository.find({
      relations: ['user', 'showSegment'],
      skip: offset,
      take: limit,
    })
  }

  findByUser(paginationQuery: PaginationQueryDto, userId: string) {
    const { limit, offset } = paginationQuery
    return this.productRepository.find({
      relations: ['user', 'showSegment'],
      skip: offset,
      take: limit,
      where: { user: { id: userId } },
    })
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne(id, {
      relations: ['user', 'showSegment'],
    })
    if (!product) {
      throw new NotFoundException(`Product id: ${id} not found`)
    }
    return product
  }

  async create(createProductDto: CreateProductDto, userId: string) {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`)
    }
    const showsegmentOrBrand = { showSegment: undefined, brand: undefined }
    if (createProductDto.showSegmentId) {
      const showSegment = await this.showsegmentRepository.findOne(
        createProductDto.showSegmentId,
        {
          relations: ['brand'],
        },
      )
      if (!showSegment) {
        throw new NotFoundException(
          `ShowSegment #${createProductDto.showSegmentId} not found`,
        )
      }
      showsegmentOrBrand.showSegment = showSegment
      showsegmentOrBrand.brand = showSegment.brand
    } else if (createProductDto.brandId) {
      const brand = await this.brandRepository.findOne(
        createProductDto.brandId,
        {
          relations: ['brand'],
        },
      )
      if (!brand) {
        throw new NotFoundException(
          `ShowSegment #${createProductDto.showSegmentId} not found`,
        )
      }
      showsegmentOrBrand.brand = brand
    }
    const product = this.productRepository.create({
      ...showsegmentOrBrand,
      user,
      ...createProductDto,
    })
    const savedProduct = await this.productRepository.save(product)
    return savedProduct
  }

  async update({ id, showSegmentId, description, name }: UpdateProductDto) {
    const showSegment = await this.showsegmentRepository.findOne(showSegmentId)
    if (!showSegment) {
      throw new NotFoundException(`ShowSegment #${showSegmentId} not found`)
    }
    await this.productRepository.update(id, {
      showSegment,
      description,
      name,
    })
    return await this.findOne(id)
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    return this.productRepository.remove(product)
  }
}
