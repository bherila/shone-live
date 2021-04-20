/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<a6VkibSsToISH71u4ddQJ3EB6fwVoGN8>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { LoginRequestsRepository } from './login-request.repository'
import { CreateLoginRequestDto } from './create-login-request.dto'
import { LoginRequest } from './login-request.entity'

@Injectable()
export class LoginRequestsService {
  constructor(
    @InjectRepository(LoginRequest)
    private readonly LoginRequestsRepository: LoginRequestsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.LoginRequestsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<LoginRequest> {
    const LoginRequest = await this.LoginRequestsRepository.findOne(entId)
    if (!LoginRequest) {
      throw new NotFoundException(`LoginRequest entId: ${entId} not found`)
    }
    return LoginRequest
  }

  async getCreatedAfter(createdAfter: Date): Promise<LoginRequest[]> {
    return await this.LoginRequestsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createLoginRequestDto: CreateLoginRequestDto,
  ): Promise<LoginRequest> {
    const LoginRequest = this.LoginRequestsRepository.create(
      createLoginRequestDto,
    )
    return this.LoginRequestsRepository.save(LoginRequest, {
      transaction: false,
    })
  }

  async createBulk(
    createLoginRequestDto: CreateLoginRequestDto[],
  ): Promise<LoginRequest[]> {
    const LoginRequest = this.LoginRequestsRepository.create(
      createLoginRequestDto,
    )
    return this.LoginRequestsRepository.save(LoginRequest, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<LoginRequest> {
    const LoginRequest = await this.getByEntId(entId)
    return this.LoginRequestsRepository.softRemove(LoginRequest)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
