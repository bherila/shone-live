import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { User } from '../../user/entities/user.entity'
import { UserRepository } from '../../user/user.repository'
import { CreateShowYourStyleEntryDto } from './dto/create-show-your-style-entry.dto'
import { ShowYourStyleEntry } from './entities/show-your-style-entry.entity'
import { ShowYourStyleEntriesRepository } from './show-your-style-entries.repository'

@Injectable()
export class ShowYourStyleEntriesService {
  constructor(
    @InjectRepository(ShowYourStyleEntry)
    private readonly showYourStyleEntriesRepository: ShowYourStyleEntriesRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.showYourStyleEntriesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: number) {
    const showYourStyleEntry = await this.showYourStyleEntriesRepository.findOne(
      id,
    )
    if (!showYourStyleEntry) {
      throw new NotFoundException(
        `Show Your Style Enrty with id: ${id} not found`,
      )
    }
    return showYourStyleEntry
  }

  async findRandomForUser(user_id: number) {
    const showYourStyleEntry = await this.showYourStyleEntriesRepository
      .createQueryBuilder('show_your_style_entry')
      .where(
        `show_your_style_entry.id NOT IN (SELECT entryId FROM show_your_style_view_record WHERE userId = ${user_id});`,
      )
      .getOne()

    return showYourStyleEntry
  }

  async create(createShowYourStyleEntryDto: CreateShowYourStyleEntryDto) {
    const user = await this.userRepository.findOne(
      createShowYourStyleEntryDto.user_id,
    )

    const showYourStyleEntry = this.showYourStyleEntriesRepository.create({
      ...createShowYourStyleEntryDto,
      user,
    })
    const savedShowYourStyleEntry = await this.showYourStyleEntriesRepository.save(
      showYourStyleEntry,
    )
    return savedShowYourStyleEntry
  }

  async remove(id: number) {
    const showYourStyleEntry = await this.findOne(id)
    return this.showYourStyleEntriesRepository.remove(showYourStyleEntry)
  }
}
