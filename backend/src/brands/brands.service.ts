import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { UserBrandRole } from '../user-brand-role/entities/user-brand-role.entity'
import { UserBrandRoleRepository } from '../user-brand-role/user-brand-roles.repository'
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
    @InjectRepository(UserBrandRole)
    private readonly userBrandRoleRepository: UserBrandRoleRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.brandRepository.find({
      relations: ['ownerUser'],
      skip: offset,
      take: limit,
    })
  }

  findByUser(paginationQuery: PaginationQueryDto, userId: string) {
    const { limit, offset } = paginationQuery
    return this.brandRepository
      .createQueryBuilder('brand')
      .leftJoin('brand.userBrandRoles', 'userBrandRoles')
      .where(
        'userBrandRoles.user_id = :userId AND userBrandRoles.read = true',
        { userId },
      )
      .skip(offset)
      .take(limit)
      .getMany()
  }

  async findOne(id: string) {
    return await this.brandRepository.findOrFail(id, {
      relations: ['ownerUser'],
    })
  }

  async create(createBrandDto: CreateBrandDto, userId: string) {
    const user = await this.userRepository.findOrFail(userId)
    const brand = this.brandRepository.create({
      ownerUser: user,
      ...createBrandDto,
    })
    const savedBrand = await this.brandRepository.save(brand)
    const userBrandRole = this.userBrandRoleRepository.create({
      user,
      brand,
      read: true,
      write: true,
      admin: true,
    })
    await this.userBrandRoleRepository.save(userBrandRole)
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
