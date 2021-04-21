import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateShowInput } from './entities/createShow.entity'
import { Show } from './entities/show.entity'
import { ShowRepository } from './show.repository'

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show) private readonly showRepository: ShowRepository,
  ) {}

  async create(data: CreateShowInput): Promise<Show> {
    const newdata = this.showRepository.create(data)
    return this.showRepository.save(newdata)
  }

  findOne(userId) {
    return this.showRepository.findOne(userId, { relations: ['chatMessages'] })
  }

  findAll() {
    return this.showRepository.find({ relations: ['chatMessages'] })
  }
}
