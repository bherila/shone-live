/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<JSTDNunz2LC6Pai0CBIM+mO6LiVZ1e96>>
 */

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { AlbumsRepository } from './album.repository'
import { CreateAlbumDto } from './create-album.dto'
import { Album } from './album.entity'

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly AlbumsRepository: AlbumsRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.AlbumsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async getByEntId(entId: string): Promise<Album> {
    const Album = await this.AlbumsRepository.findOne(entId)
    if (!Album) {
      throw new NotFoundException(`Album entId: ${entId} not found`)
    }
    return Album
  }

  async getCreatedAfter(createdAfter: Date): Promise<Album[]> {
    return await this.AlbumsRepository.createQueryBuilder()
      .where('ent_created > :dt', { dt: createdAfter })
      .getRawMany()
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const Album = this.AlbumsRepository.create(createAlbumDto)
    return this.AlbumsRepository.save(Album, { transaction: false })
  }

  async createBulk(createAlbumDto: CreateAlbumDto[]): Promise<Album[]> {
    const Album = this.AlbumsRepository.create(createAlbumDto)
    return this.AlbumsRepository.save(Album, { transaction: false })
  }

  async removeByEntId(entId: string): Promise<Album> {
    const Album = await this.getByEntId(entId)
    return this.AlbumsRepository.softRemove(Album)
  }

  /* BEGIN MANUAL SECTION CUSTOM_SERVICE */
  /* END MANUAL SECTION */
}
