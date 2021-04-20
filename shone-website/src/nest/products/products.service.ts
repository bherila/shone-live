import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
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
    private readonly showSegmentRepository: ShowSegmentRepository,
    @InjectRepository(Brand)
    private readonly brandRepository: BrandRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.productRepository.find({
      relations: ['user', 'brand', 'showSegments'],
      skip: offset,
      take: limit,
    })
  }

  findByUser(paginationQuery: PaginationQueryDto, userId: string) {
    const { limit, offset } = paginationQuery
    return this.productRepository.find({
      relations: ['user', 'brand', 'showSegments'],
      skip: offset,
      take: limit,
      where: { user: { id: userId } },
    })
  }

  findByBrand(paginationQuery: PaginationQueryDto, brandId: string) {
    const { limit, offset } = paginationQuery
    return this.productRepository.find({
      relations: ['user', 'brand', 'showSegments'],
      skip: offset,
      take: limit,
      where: { brand: { id: brandId } },
    })
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne(id, {
      relations: ['user', 'brand', 'showSegments'],
    })
    if (!product) {
      throw new NotFoundException(`Product id: ${id} not found`)
    }
    return product
  }

  async create(createProductDto: CreateProductDto, userId: string) {
    if (!createProductDto.showSegmentId && !createProductDto.brandId) {
      throw new UnprocessableEntityException(
        `you must define a related ShowSegment or Brand`,
      )
    }
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`)
    }
    const showsegmentOrBrand = { showSegments: undefined, brand: undefined }
    if (createProductDto.showSegmentId) {
      const showSegment = await this.showSegmentRepository.findOne(
        createProductDto.showSegmentId,
      )
      if (!showSegment) {
        throw new NotFoundException(
          `Show Segment #${createProductDto.showSegmentId} not found`,
        )
      }
      showsegmentOrBrand.showSegments = [showSegment]
    } else if (createProductDto.brandId) {
      const brand = await this.brandRepository.findOne(createProductDto.brandId)
      if (!brand) {
        throw new NotFoundException(
          `Brand #${createProductDto.showSegmentId} not found`,
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

  async update({ id, description, name }: UpdateProductDto) {
    await this.productRepository.update(id, {
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
