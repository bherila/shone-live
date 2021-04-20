import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { BrandRepository } from '../brands/brands.repository'
import { Brand } from '../brands/entities/brand.entity'
import { Show } from '../show/entities/show.entity'
import { ShowRepository } from '../show/show.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { CreateShowSegmentDto } from './dto/create-show-segment.dto'
import { UpdateShowSegmentDto } from './dto/update-show-segment.dto'
import { ShowSegment } from './entities/show-segment.entity'
import { ShowSegmentRepository } from './show-segments.repository'

@Injectable()
export class ShowSegmentsService {
  constructor(
    @InjectRepository(ShowSegment)
    private readonly showSegmentRepository: ShowSegmentRepository,
    @InjectRepository(Brand)
    private readonly brandRepository: BrandRepository,
    @InjectRepository(Show)
    private readonly showRepository: ShowRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  findAll() {
    return this.showSegmentRepository.find({
      relations: ['brand', 'show'],
    })
  }

  async findOne(id: string) {
    const showSegment = await this.showSegmentRepository.findOne(id, {
      relations: ['brand', 'show'],
    })
    if (!showSegment) {
      throw new NotFoundException(`ShowSegment id: ${id} not found`)
    }
    return showSegment
  }

  async create(
    { brandId, showId, title }: CreateShowSegmentDto,
    userId: string,
  ) {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`)
    }
    const brand = await this.brandRepository.findOne(brandId)
    if (!brand) {
      throw new NotFoundException(`Brand #${userId} not found`)
    }
    const show = await this.showRepository.findOne(showId)
    if (!show) {
      throw new NotFoundException(`Show #${userId} not found`)
    }
    const showSegment = this.showSegmentRepository.create({
      ownerUser: user,
      brand,
      show,
      title,
    })
    const savedShowSegment = await this.showSegmentRepository.save(showSegment)
    return savedShowSegment
  }

  async update({ id, title }: UpdateShowSegmentDto) {
    await this.showSegmentRepository.update(id, {
      title,
    })
    return await this.findOne(id)
  }

  async remove(id: string) {
    const showSegment = await this.findOne(id)
    return this.showSegmentRepository.remove(showSegment)
  }
}
