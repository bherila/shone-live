import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { BrandRepository } from '../brands/brands.repository'
import { Brand } from '../brands/entities/brand.entity'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { CreateUserBrandRoleDto } from './dto/create-user-brand-role.dto'
import { UpdateUserBrandRoleDto } from './dto/update-user-brand-role.dto'
import { UserBrandRole } from './entities/user-brand-role.entity'
import { UserBrandRoleRepository } from './user-brand-roles.repository'

@Injectable()
export class UserBrandRolesService {
  constructor(
    @InjectRepository(UserBrandRole)
    private readonly userbrandroleRepository: UserBrandRoleRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(Brand)
    private readonly brandRepository: BrandRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.userbrandroleRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    })
  }

  findByUser(paginationQuery: PaginationQueryDto, userId: string) {
    const { limit, offset } = paginationQuery
    return this.userbrandroleRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
      where: { user: { id: userId } },
    })
  }

  async findOne(id: string) {
    const userbrandrole = await this.userbrandroleRepository.findOne(id, {
      relations: ['user'],
    })
    if (!userbrandrole) {
      throw new NotFoundException(`UserBrandRole id: ${id} not found`)
    }
    return userbrandrole
  }

  async create(createUserBrandRoleDto: CreateUserBrandRoleDto, userId: string) {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`)
    }
    const userbrandrole = this.userbrandroleRepository.create({
      user,
      ...createUserBrandRoleDto,
    })
    const savedUserBrandRole = await this.userbrandroleRepository.save(
      userbrandrole,
    )
    return savedUserBrandRole
  }

  async update({ id, description, name }: UpdateUserBrandRoleDto) {
    await this.userbrandroleRepository.update(id, {
      description,
      name,
    })
    return await this.findOne(id)
  }

  async remove(id: string) {
    const userbrandrole = await this.findOne(id)
    return this.userbrandroleRepository.remove(userbrandrole)
  }
}
