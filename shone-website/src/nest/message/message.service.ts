import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Show } from '../show/entities/show.entity'
import { ShowRepository } from '../show/show.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { MessageEntity } from './entities/message.entity'
import { MessageRepository } from './message.repository'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageEntityRepository: MessageRepository,

    @InjectRepository(Show)
    private readonly showRepository: ShowRepository,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}
  async create(show_id, message, user_id): Promise<MessageEntity> {
    const show = await this.showRepository.findOne(show_id)
    const author = await this.userRepository.findOne(user_id)
    const newMessage = await this.messageEntityRepository.create({
      show,
      message,
      alias: 'ABC', //For now we put as static
      author,
    })
    return await this.messageEntityRepository.save(newMessage)
  }

  findOne(messageEntityId) {
    return this.messageEntityRepository.findOne(messageEntityId)
  }

  findAll() {
    return this.messageEntityRepository.find()
  }
}
