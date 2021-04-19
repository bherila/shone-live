import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { BrandRepository } from './brands.repository'
import { CreateBrandDto } from './dto/create-brand.dto'
import { UpdateBrandDto } from './dto/update-brand.dto'
import { Brand } from './entities/brand.entity'

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: BrandRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.brandRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    })
  }

  findByUser(paginationQuery: PaginationQueryDto, userId: string) {
    const { limit, offset } = paginationQuery
    return this.brandRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
      where: { user: { id: userId } },
    })
  }

  async findOne(id: string) {
    const brand = await this.brandRepository.findOne(id, {
      relations: ['user'],
    })
    if (!brand) {
      throw new NotFoundException(`Brand id: ${id} not found`)
    }
    return brand
  }

  async create(createBrandDto: CreateBrandDto, userId: string) {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`)
    }
    const brand = this.brandRepository.create({
      user,
      ...createBrandDto,
    })
    const savedBrand = await this.brandRepository.save(brand)
    return savedBrand
  }

  async update({ id, description, name }: UpdateBrandDto) {
    await this.brandRepository.update(id, {
      description,
      name,
    })
    return await this.findOne(id)
  }

  async remove(id: string) {
    const brand = await this.findOne(id)
    return this.brandRepository.remove(brand)
  }
}
