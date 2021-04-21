/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<SAW7vcQF31XNJu823yJlhJw2sEKns5w8>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { MetasRepository } from './meta.repository'
import { CreateMetaDto } from './create-meta.dto'
import { Meta } from './meta.entity'

@Injectable()
export class MetasService {
  constructor(
    @InjectRepository(Meta)
    private readonly MetasRepository: MetasRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.MetasRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Meta> {
    const Meta = await this.MetasRepository.findOne(entId)
    if (!Meta) {
      throw new NotFoundException(`Meta entId: ${entId} not found`)
    }
    return Meta
  }

  async getCreatedAfter(createdAfter: Date): Promise<Meta[]> {
    return await this.MetasRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createMetaDto: CreateMetaDto): Promise<Meta> {
    const Meta = this.MetasRepository.create(createMetaDto)
    return this.MetasRepository.save(Meta, { transaction: false })
  }

  async createBulk(createMetaDto: CreateMetaDto[]): Promise<Meta[]> {
    const Meta = this.MetasRepository.create(createMetaDto)
    return this.MetasRepository.save(Meta, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Meta> {
    const Meta = await this.getByEntId(entId)
    return this.MetasRepository.softRemove(Meta)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
