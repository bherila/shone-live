import { Injectable } from '@nestjs/common'
import { Service } from 'typedi'

import { CreateShowInput } from './entities/createShow.entity'
import { Show } from './entities/show.entity'
import { ShowRepository } from './show.repository'

@Service()
@Injectable()
export class ShowService {
  constructor(private readonly showRepository: ShowRepository) {}

  async create(data: CreateShowInput): Promise<Show> {
    const newdata = this.showRepository.create(data)
    return this.showRepository.save(newdata)
  }

  findOne(userId) {
    return this.showRepository.findOne(userId,{relations: ['chatMessages']})
  }

  findAll() {
    return this.showRepository.find({relations: ['chatMessages']})
  }
}
