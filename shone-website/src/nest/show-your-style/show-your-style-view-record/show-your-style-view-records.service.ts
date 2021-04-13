import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { User } from '../../user/entities/user.entity'
import { UserRepository } from '../../user/user.repository'
import { ShowYourStyleEntry } from '../show-your-style-entry/entities/show-your-style-entry.entity'
import { ShowYourStyleEntriesRepository } from '../show-your-style-entry/show-your-style-entries.repository'
import { CreateShowYourStyleViewRecordDto } from './dto/create-show-your-style-view-record.dto'
import { ShowYourStyleViewRecord } from './entities/show-your-style-view-record.entity'
import { ShowYourStyleViewRecordsRepository } from './show-your-style-view-records.repository'

@Injectable()
export class ShowYourStyleViewRecordsService {
  constructor(
    @InjectRepository(ShowYourStyleViewRecord)
    private readonly showYourStyleViewRecordsRepository: ShowYourStyleViewRecordsRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(ShowYourStyleEntry)
    private readonly showYourStyleEntriesRepository: ShowYourStyleEntriesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.showYourStyleViewRecordsRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: number) {
    const showYourStyleViewRecord = await this.showYourStyleViewRecordsRepository.findOne(
      id,
    )
    if (!showYourStyleViewRecord) {
      throw new NotFoundException(
        `Show Your Style View Record with id: ${id} not found`,
      )
    }
    return showYourStyleViewRecord
  }

  async create(
    createShowYourStyleViewRecordDto: CreateShowYourStyleViewRecordDto,
  ) {
    const user = await this.userRepository.findOne(
      createShowYourStyleViewRecordDto.user_id,
    )
    const entry = await this.showYourStyleEntriesRepository.findOne(
      createShowYourStyleViewRecordDto.entry_id,
    )
    const showYourStyleViewRecord = this.showYourStyleViewRecordsRepository.create(
      { ...createShowYourStyleViewRecordDto, user, entry },
    )
    const savedShowYourStyleViewRecord = await this.showYourStyleViewRecordsRepository.save(
      showYourStyleViewRecord,
    )
    return savedShowYourStyleViewRecord
  }

  async remove(id: number) {
    const showYourStyleViewRecord = await this.findOne(id)
    return this.showYourStyleViewRecordsRepository.remove(
      showYourStyleViewRecord,
    )
  }
}
