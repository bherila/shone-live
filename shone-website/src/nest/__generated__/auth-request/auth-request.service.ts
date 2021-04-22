/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<YrFuoc9YQY+t6rtj1ItGZP+trf+zJymu>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { AuthRequest } from './auth-request.entity'
import { AuthRequestsRepository } from './auth-request.repository'
import { CreateAuthRequestDto } from './create-auth-request.dto'

@Injectable()
export class AuthRequestsService {
  constructor(
    @InjectRepository(AuthRequest)
    private readonly AuthRequestsRepository: AuthRequestsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.AuthRequestsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<AuthRequest> {
    const AuthRequest = await this.AuthRequestsRepository.findOne(entId)
    if (!AuthRequest) {
      throw new NotFoundException(`AuthRequest entId: ${entId} not found`)
    }
    return AuthRequest
  }

  async getCreatedAfter(createdAfter: Date): Promise<AuthRequest[]> {
    return await this.AuthRequestsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createAuthRequestDto: CreateAuthRequestDto,
  ): Promise<AuthRequest> {
    const AuthRequest = this.AuthRequestsRepository.create(createAuthRequestDto)
    return this.AuthRequestsRepository.save(AuthRequest, { transaction: false })
  }

  async createBulk(
    createAuthRequestDto: CreateAuthRequestDto[],
  ): Promise<AuthRequest[]> {
    const AuthRequest = this.AuthRequestsRepository.create(createAuthRequestDto)
    return this.AuthRequestsRepository.save(AuthRequest, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<AuthRequest> {
    const AuthRequest = await this.getByEntId(entId)
    return this.AuthRequestsRepository.softRemove(AuthRequest)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
