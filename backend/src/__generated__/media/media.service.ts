/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<75F7zEswSrazCUKd+9sWHsua58F8+NFL>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { MediaRepository } from './media.repository'
import { CreateMediaDto } from './create-media.dto'
import { Media } from './media.entity'

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly MediaRepository: MediaRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.MediaRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Media> {
    const Media = await this.MediaRepository.findOne(entId)
    if (!Media) {
      throw new NotFoundException(`Media entId: ${entId} not found`)
    }
    return Media
  }

  async getCreatedAfter(createdAfter: Date): Promise<Media[]> {
    return await this.MediaRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    const Media = this.MediaRepository.create(createMediaDto)
    return this.MediaRepository.save(Media, { transaction: false })
  }

  async createBulk(createMediaDto: CreateMediaDto[]): Promise<Media[]> {
    const Media = this.MediaRepository.create(createMediaDto)
    return this.MediaRepository.save(Media, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Media> {
    const Media = await this.getByEntId(entId)
    return this.MediaRepository.softRemove(Media)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
