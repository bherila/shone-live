/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<D1ftvu9DZxRWHUYSOI0Zb5bBDetv8RHi>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Bag } from './bag.entity'
import { BagsRepository } from './bag.repository'
import { CreateBagDto } from './create-bag.dto'

@Injectable()
export class BagsService {
  constructor(
    @InjectRepository(Bag)
    private readonly BagsRepository: BagsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.BagsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Bag> {
    const Bag = await this.BagsRepository.findOne(entId)
    if (!Bag) {
      throw new NotFoundException(`Bag entId: ${entId} not found`)
    }
    return Bag
  }

  async getCreatedAfter(createdAfter: Date): Promise<Bag[]> {
    return await this.BagsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createBagDto: CreateBagDto): Promise<Bag> {
    const Bag = this.BagsRepository.create(createBagDto)
    return this.BagsRepository.save(Bag, { transaction: false })
  }

  async createBulk(createBagDto: CreateBagDto[]): Promise<Bag[]> {
    const Bag = this.BagsRepository.create(createBagDto)
    return this.BagsRepository.save(Bag, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Bag> {
    const Bag = await this.getByEntId(entId)
    return this.BagsRepository.softRemove(Bag)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
