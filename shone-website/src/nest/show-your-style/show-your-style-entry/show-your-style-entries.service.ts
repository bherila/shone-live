import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
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
        `Show Your Style Entry with id: ${id} not found`,
      )
    }
    return showYourStyleEntry
  }

  async findRandomForUser(userId: number) {
    const showYourStyleEntry = await this.showYourStyleEntriesRepository
      .createQueryBuilder('show_your_style_entry')
      .where(
        `show_your_style_entry.id NOT IN (SELECT entry_id FROM show_your_style_view_record WHERE user_id = ${userId});`,
      )
      .getOne()

    return showYourStyleEntry
  }

  async create(createShowYourStyleEntryDto: CreateShowYourStyleEntryDto) {
    const user = await this.userRepository.findOne(
      createShowYourStyleEntryDto.userId,
    )
    if (!user) {
      throw new NotFoundException(
        `User with id: ${createShowYourStyleEntryDto.userId} not found`,
      )
    }
    const entry = await this.showYourStyleEntriesRepository.findOne({
      videoUrl: createShowYourStyleEntryDto.videoUrl,
    })
    if (entry) {
      throw new UnprocessableEntityException(
        `Entry with that videoUrl already exists`,
      )
    }

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
