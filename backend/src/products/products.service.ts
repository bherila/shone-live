import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { BrandRepository } from '../brands/brands.repository'
import { Brand } from '../brands/entities/brand.entity'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { ShowSegment } from '../show-segment/entities/show-segment.entity'
import { ShowSegmentRepository } from '../show-segment/show-segments.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { UserBrandRole } from '../user-brand-role/entities/user-brand-role.entity'
import { UserBrandRoleRepository } from '../user-brand-role/user-brand-roles.repository'
import { UserShowRole } from '../user-show-role/entities/user-show-role.entity'
import { UserShowRoleRepository } from '../user-show-role/user-show-roles.repository'
import { VariantsService } from '../variants/variants.service'
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
    @InjectRepository(UserBrandRole)
    private readonly userBrandRoleRepository: UserBrandRoleRepository,
    @InjectRepository(UserShowRole)
    private readonly userShowRoleRepository: UserShowRoleRepository,
    private readonly variantsService: VariantsService,
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

  async findByBrand(
    paginationQuery: PaginationQueryDto,
    brandId: string,
    userId: string,
  ) {
    await this.userBrandRoleRepository.checkPermission(brandId, userId, 'read')
    const { limit, offset } = paginationQuery
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.brand', 'brand')
      .leftJoin('product.showSegments', 'showSegments')
      .where(
        `(product.brand_id = :brandId OR showSegments.brand_id = :brandId)`,
        { brandId },
      )
      .skip(offset)
      .take(limit)
      .getMany()
  }

  async findByShow(
    paginationQuery: PaginationQueryDto,
    showId: string,
    userId: string,
  ) {
    await this.userShowRoleRepository.checkPermission(showId, userId, 'read')
    const { limit, offset } = paginationQuery
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.showSegments', 'showSegments')
      .where(`(showSegments.show_id = :showId)`, {
        showId,
      })
      .skip(offset)
      .take(limit)
      .getMany()
  }

  async findOne(id: string) {
    return await this.productRepository.findOrFail(id, {
      relations: ['variants', 'variants.skus'],
    })
  }

  async create(
    {
      brandId,
      showSegmentId,
      variantData,
      ...createProductDto
    }: CreateProductDto,
    userId: string,
  ) {
    if (!showSegmentId && !brandId) {
      throw new UnprocessableEntityException(
        `You must define a related ShowSegment or Brand`,
      )
    }

    const user = await this.userRepository.findOrFail(userId)
    const showsegmentOrBrand = { showSegments: undefined, brand: undefined }
    if (showSegmentId) {
      const showSegment = await this.showSegmentRepository.findOrFail(
        showSegmentId,
        {
          relations: ['show'],
        },
      )
      await this.userShowRoleRepository.checkPermission(
        showSegment.show.id,
        userId,
        'write',
      )
      showsegmentOrBrand.showSegments = [showSegment]
    } else if (brandId) {
      const brand = await this.brandRepository.findOrFail(brandId)
      await this.userBrandRoleRepository.checkPermission(
        brandId,
        userId,
        'write',
      )
      showsegmentOrBrand.brand = brand
    }
    const product = this.productRepository.create({
      ...showsegmentOrBrand,
      user,
      ...createProductDto,
    })
    const savedProduct = await this.productRepository.save(product)
    await this.variantsService.create({
      productId: savedProduct.id,
      ...variantData,
    })
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
