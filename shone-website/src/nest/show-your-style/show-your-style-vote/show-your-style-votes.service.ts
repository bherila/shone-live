import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { User } from '../../user/entities/user.entity'
import { UserRepository } from '../../user/user.repository'
import { ShowYourStyleEntry } from '../show-your-style-entry/entities/show-your-style-entry.entity'
import { ShowYourStyleEntriesRepository } from '../show-your-style-entry/show-your-style-entries.repository'
import { CreateShowYourStyleVoteDto } from './dto/create-show-your-style-vote.dto'
import { ShowYourStyleVote } from './entities/show-your-style-vote.entity'
import { ShowYourStyleVotesRepository } from './show-your-style-votes.repository'

@Injectable()
export class ShowYourStyleVotesService {
  constructor(
    @InjectRepository(ShowYourStyleVote)
    private readonly showYourStyleVotesRepository: ShowYourStyleVotesRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(ShowYourStyleEntry)
    private readonly showYourStyleEntriesRepository: ShowYourStyleEntriesRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.showYourStyleVotesRepository.find({
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: number) {
    const showYourStyleVote = await this.showYourStyleVotesRepository.findOne(
      id,
    )
    if (!showYourStyleVote) {
      throw new NotFoundException(
        `Show Your Style Vote with id: ${id} not found`,
      )
    }
    return showYourStyleVote
  }

  async create(createShowYourStyleVoteDto: CreateShowYourStyleVoteDto) {
    const user = await this.userRepository.findOne(
      createShowYourStyleVoteDto.user_id,
    )
    const entry = await this.showYourStyleEntriesRepository.findOne(
      createShowYourStyleVoteDto.entry_id,
    )
    const showYourStyleVote = this.showYourStyleVotesRepository.create({
      ...createShowYourStyleVoteDto,
      user,
      entry,
    })
    const savedShowYourStyleVote = await this.showYourStyleVotesRepository.save(
      showYourStyleVote,
    )
    return savedShowYourStyleVote
  }

  async remove(id: number) {
    const showYourStyleVote = await this.findOne(id)
    return this.showYourStyleVotesRepository.remove(showYourStyleVote)
  }
}
