import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { ShowSegmentsService } from '../show-segment/show-segments.service'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { UserShowRole } from '../user-show-role/entities/user-show-role.entity'
import { UserShowRoleRepository } from '../user-show-role/user-show-roles.repository'
import { CreateShowDto } from './dto/create-show.dto'
import { CreateShowWithSegmentDto } from './dto/create-show-with-segment'
import { Show } from './entities/show.entity'
import { ShowRepository } from './show.repository'

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show) private readonly showRepository: ShowRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(UserShowRole)
    private readonly userShowRoleRepository: UserShowRoleRepository,
    private readonly showSegmentsService: ShowSegmentsService,
  ) {}

  async createWithSegment(
    { showSegment, brandId, ...data }: CreateShowWithSegmentDto,
    userId: string,
  ): Promise<Show> {
    const user = await this.userRepository.findOrFail(userId)
    const show = this.showRepository.create({
      ownerUser: user,
      ...data,
    })
    const savedShow = await this.showRepository.save(show)
    await this.showSegmentsService.create(
      { brandId, showId: savedShow.id, ...showSegment },
      userId,
    )
    const userShowRole = this.userShowRoleRepository.create({
      user,
      show,
      read: true,
      write: true,
      admin: true,
      streamTo: true,
    })
    await this.userShowRoleRepository.save(userShowRole)
    return savedShow
  }

  async create(data: CreateShowDto, userId: string): Promise<Show> {
    const user = await this.userRepository.findOrFail(userId)
    const show = this.showRepository.create({
      ownerUser: user,
      ...data,
    })
    const savedShow = await this.showRepository.save(show)
    const userShowRole = this.userShowRoleRepository.create({
      user,
      show,
      read: true,
      write: true,
      admin: true,
      streamTo: true,
    })
    await this.userShowRoleRepository.save(userShowRole)
    return savedShow
  }

  findOne(userId) {
    return this.showRepository.findOne(userId, {
      relations: [
        'chatMessages',
        'showSegments',
        'showSegments.products',
        'userShowRoles',
      ],
    })
  }

  findAll() {
    return this.showRepository.find({
      relations: ['chatMessages', 'showSegments', 'userShowRoles'],
    })
  }

  async findByBrand(paginationQuery: PaginationQueryDto, brandId: string) {
    const { limit, offset } = paginationQuery
    const show = await this.showRepository
      .createQueryBuilder('show')
      .leftJoinAndSelect('show.showSegments', 'showSegments')
      .leftJoin('brand', 'brand', 'brand.id = showSegments.brand_id ')
      .where('brand.id = :brandId', { brandId })
      .skip(offset)
      .take(limit)
      .getMany()
    return show
  }
}
