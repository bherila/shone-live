import { Injectable } from '@nestjs/common'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { CreateShowInput } from './create-show-entity'
import { Show } from './show-entity'

@Service()
@Injectable()
export class showService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async create(data: CreateShowInput): Promise<Show> {
    const newdata = this.showRepository.create(data)
    return this.showRepository.save(newdata)
  }
}
