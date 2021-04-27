import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { BrandRepository } from '../brands/brands.repository'
import { Brand } from '../brands/entities/brand.entity'
import { Product } from '../products/entities/product.entity'
import { ProductRepository } from '../products/products.repository'
import { Show } from '../show/entities/show.entity'
import { ShowRepository } from '../show/show.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { UserBrandRole } from '../user-brand-role/entities/user-brand-role.entity'
import { UserBrandRoleRepository } from '../user-brand-role/user-brand-roles.repository'
import { UserShowRole } from '../user-show-role/entities/user-show-role.entity'
import { UserShowRoleRepository } from '../user-show-role/user-show-roles.repository'
import { CreateShowSegmentDto } from './dto/create-show-segment.dto'
import { UpdateShowSegmentDto } from './dto/update-show-segment.dto'
import { ShowSegment } from './entities/show-segment.entity'
import { ShowSegmentRepository } from './show-segments.repository'

@Injectable()
export class ShowSegmentsService {
  constructor(
    @InjectRepository(ShowSegment)
    private readonly showSegmentRepository: ShowSegmentRepository,
    @InjectRepository(Brand)
    private readonly brandRepository: BrandRepository,
    @InjectRepository(Show)
    private readonly showRepository: ShowRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(UserBrandRole)
    private readonly userBrandRoleRepository: UserBrandRoleRepository,
    @InjectRepository(UserShowRole)
    private readonly userShowRoleRepository: UserShowRoleRepository,
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
  ) {}

  findAll() {
    return this.showSegmentRepository.find({
      relations: ['brand', 'show', 'products'],
    })
  }

  async findByBrandAndShow(brandId: string, showId: string, userId: string) {
    await this.userBrandRoleRepository.checkPermission(brandId, userId, 'read')
    await this.userShowRoleRepository.checkPermission(showId, userId, 'read')
    return this.showSegmentRepository.find({
      where: { brand: { id: brandId }, show: { id: showId } },
      relations: ['brand', 'show', 'products'],
    })
  }

  async findOne(id: string) {
    return await this.showSegmentRepository.findOrFail(id, {
      relations: ['brand', 'show', 'products'],
    })
  }

  async create(
    { brandId, showId, title, productsIds }: CreateShowSegmentDto,
    userId: string,
  ) {
    const user = await this.userRepository.findOrFail(userId)
    const brand = await this.brandRepository.findOrFail(brandId)
    const show = await this.showRepository.findOrFail(showId)
    const products = await this.productRepository.findAllOrFail(productsIds)
    const showSegment = this.showSegmentRepository.create({
      ownerUser: user,
      brand,
      show,
      title,
      products,
    })
    const savedShowSegment = await this.showSegmentRepository.save(showSegment)
    return savedShowSegment
  }

  async update({ id, title }: UpdateShowSegmentDto) {
    await this.showSegmentRepository.update(id, {
      title,
    })
    return await this.findOne(id)
  }

  async remove(id: string) {
    const showSegment = await this.findOne(id)
    return this.showSegmentRepository.remove(showSegment)
  }
}
