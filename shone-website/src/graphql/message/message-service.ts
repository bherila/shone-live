import { Injectable } from '@nestjs/common'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Show } from '../show/show-entity'
import { User } from '../user/user-entity'
import { MessageEntity } from './message-entity'
@Service()
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageEntityRepository: Repository<MessageEntity>,
    @InjectRepository(Show) private readonly showRepository: Repository<Show>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(show_id, message, user_id): Promise<MessageEntity> {
    const show = await this.showRepository.findOne(show_id)
    const author = await this.userRepository.findOne(user_id)
    const newMessage = this.messageEntityRepository.create({
      show,
      message,
      alias: 'dsa',
      author,
    })
    return await this.messageEntityRepository.save(newMessage)
  }
}
