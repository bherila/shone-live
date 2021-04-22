/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<E1Fbvz1+32xae9E13BflT342HFwHMSCI>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateLoginResponseDto } from './create-login-response.dto'
import { LoginResponse } from './login-response.entity'
import { LoginResponsesRepository } from './login-response.repository'

@Injectable()
export class LoginResponsesService {
  constructor(
    @InjectRepository(LoginResponse)
    private readonly LoginResponsesRepository: LoginResponsesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.LoginResponsesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<LoginResponse> {
    const LoginResponse = await this.LoginResponsesRepository.findOne(entId)
    if (!LoginResponse) {
      throw new NotFoundException(`LoginResponse entId: ${entId} not found`)
    }
    return LoginResponse
  }

  async getCreatedAfter(createdAfter: Date): Promise<LoginResponse[]> {
    return await this.LoginResponsesRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(
    createLoginResponseDto: CreateLoginResponseDto,
  ): Promise<LoginResponse> {
    const LoginResponse = this.LoginResponsesRepository.create(
      createLoginResponseDto,
    )
    return this.LoginResponsesRepository.save(LoginResponse, {
      transaction: false,
    })
  }

  async createBulk(
    createLoginResponseDto: CreateLoginResponseDto[],
  ): Promise<LoginResponse[]> {
    const LoginResponse = this.LoginResponsesRepository.create(
      createLoginResponseDto,
    )
    return this.LoginResponsesRepository.save(LoginResponse, {
      transaction: false,
    })
  }

  async removeByEntId(entId: string): Promise<LoginResponse> {
    const LoginResponse = await this.getByEntId(entId)
    return this.LoginResponsesRepository.softRemove(LoginResponse)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
