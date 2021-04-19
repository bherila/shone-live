import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { BrandRepository } from '../brands/brands.repository'
import { Brand } from '../brands/entities/brand.entity'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { Show } from '../show/entities/show.entity'
import { ShowRepository } from '../show/show.repository'
import { CreateShowSegmentDto } from './dto/create-show-segment.dto'
import { UpdateShowSegmentDto } from './dto/update-show-segment.dto'
import { ShowSegment } from './entities/show-segment.entity'
import { ShowSegmentRepository } from './show-segments.repository'

@Injectable()
export class ShowSegmentsService {
  constructor(
    @InjectRepository(ShowSegment)
    private readonly showsegmentRepository: ShowSegmentRepository,
    @InjectRepository(Brand)
    private readonly brandRepository: BrandRepository,
    @InjectRepository(Show)
    private readonly showRepository: ShowRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.showsegmentRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: string) {
    const showsegment = await this.showsegmentRepository.findOne(id, {
      relations: ['user'],
    })
    if (!showsegment) {
      throw new NotFoundException(`ShowSegment id: ${id} not found`)
    }
    return showsegment
  }

  async create(createShowSegmentDto: CreateShowSegmentDto, userId: string) {
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`)
    }
    const showsegment = this.showsegmentRepository.create({
      user,
      ...createShowSegmentDto,
    })
    const savedShowSegment = await this.showsegmentRepository.save(showsegment)
    return savedShowSegment
  }

  async update({ id, description, name }: UpdateShowSegmentDto) {
    await this.showsegmentRepository.update(id, {
      description,
      name,
    })
    return await this.findOne(id)
  }

  async remove(id: string) {
    const showsegment = await this.findOne(id)
    return this.showsegmentRepository.remove(showsegment)
  }
}
