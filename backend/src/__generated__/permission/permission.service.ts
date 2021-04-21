/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<</GwAS79sWnxPiAT7OETdQJPz/tag+PiD>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { PermissionsRepository } from './permission.repository'
import { CreatePermissionDto } from './create-permission.dto'
import { Permission } from './permission.entity'

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly PermissionsRepository: PermissionsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.PermissionsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Permission> {
    const Permission = await this.PermissionsRepository.findOne(entId)
    if (!Permission) {
      throw new NotFoundException(`Permission entId: ${entId} not found`)
    }
    return Permission
  }

  async getCreatedAfter(createdAfter: Date): Promise<Permission[]> {
    return await this.PermissionsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const Permission = this.PermissionsRepository.create(createPermissionDto)
    return this.PermissionsRepository.save(Permission, { transaction: false })
  }

  async createBulk(
    createPermissionDto: CreatePermissionDto[],
  ): Promise<Permission[]> {
    const Permission = this.PermissionsRepository.create(createPermissionDto)
    return this.PermissionsRepository.save(Permission, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Permission> {
    const Permission = await this.getByEntId(entId)
    return this.PermissionsRepository.softRemove(Permission)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
