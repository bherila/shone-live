/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<t6YHkF3vpFDzuzPWNBFcJ1xK25JliAxZ>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateRoleDto } from './create-role.dto'
import { Role } from './role.entity'
import { RolesRepository } from './role.repository'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly RolesRepository: RolesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.RolesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Role> {
    const Role = await this.RolesRepository.findOne(entId)
    if (!Role) {
      throw new NotFoundException(`Role entId: ${entId} not found`)
    }
    return Role
  }

  async getCreatedAfter(createdAfter: Date): Promise<Role[]> {
    return await this.RolesRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const Role = this.RolesRepository.create(createRoleDto)
    return this.RolesRepository.save(Role, { transaction: false })
  }

  async createBulk(createRoleDto: CreateRoleDto[]): Promise<Role[]> {
    const Role = this.RolesRepository.create(createRoleDto)
    return this.RolesRepository.save(Role, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Role> {
    const Role = await this.getByEntId(entId)
    return this.RolesRepository.softRemove(Role)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
