import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { Show } from '../show/entities/show.entity'
import { ShowRepository } from '../show/show.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { CreateUserShowRoleDto } from './dto/create-user-show-role.dto'
import { UpdateUserShowRoleDto } from './dto/update-user-show-role.dto'
import { UserShowRole } from './entities/user-show-role.entity'
import { UserShowRoleRepository } from './user-show-roles.repository'

@Injectable()
export class UserShowRolesService {
  constructor(
    @InjectRepository(UserShowRole)
    private readonly usershowroleRepository: UserShowRoleRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(Show)
    private readonly showRepository: ShowRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.usershowroleRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    })
  }

  findByUser(paginationQuery: PaginationQueryDto, userId: string) {
    const { limit, offset } = paginationQuery
    return this.usershowroleRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
      where: { user: { id: userId } },
    })
  }

  async findOne(id: string) {
    const usershowrole = await this.usershowroleRepository.findOne(id, {
      relations: ['user'],
    })
    if (!usershowrole) {
      throw new NotFoundException(`UserShowRole id: ${id} not found`)
    }
    return usershowrole
  }

  async create(createUserShowRoleDto: CreateUserShowRoleDto, userId: string) {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`)
    }
    const usershowrole = this.usershowroleRepository.create({
      user,
      ...createUserShowRoleDto,
    })
    const savedUserShowRole = await this.usershowroleRepository.save(
      usershowrole,
    )
    return savedUserShowRole
  }

  async update({ id, ...updateUserShowRoleDto }: UpdateUserShowRoleDto) {
    await this.usershowroleRepository.update(id, updateUserShowRoleDto)
    return await this.findOne(id)
  }

  async remove(id: string) {
    const usershowrole = await this.findOne(id)
    return this.usershowroleRepository.remove(usershowrole)
  }
}
