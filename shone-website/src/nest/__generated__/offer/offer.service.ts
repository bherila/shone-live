/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ehPov8m3/VXYOQ35N/zJx4K7HTXXVzmy>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CreateOfferDto } from './create-offer.dto'
import { Offer } from './offer.entity'
import { OffersRepository } from './offer.repository'

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly OffersRepository: OffersRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.OffersRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Offer> {
    const Offer = await this.OffersRepository.findOne(entId)
    if (!Offer) {
      throw new NotFoundException(`Offer entId: ${entId} not found`)
    }
    return Offer
  }

  async getCreatedAfter(createdAfter: Date): Promise<Offer[]> {
    return await this.OffersRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const Offer = this.OffersRepository.create(createOfferDto)
    return this.OffersRepository.save(Offer, { transaction: false })
  }

  async createBulk(createOfferDto: CreateOfferDto[]): Promise<Offer[]> {
    const Offer = this.OffersRepository.create(createOfferDto)
    return this.OffersRepository.save(Offer, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Offer> {
    const Offer = await this.getByEntId(entId)
    return this.OffersRepository.softRemove(Offer)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
