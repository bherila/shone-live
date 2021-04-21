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
  async create(showId, message, userId): Promise<MessageEntity> {
    const show = await this.showRepository.findOne(showId)
    const author = await this.userRepository.findOne(userId)
    const newMessage = await this.messageEntityRepository.create({
      show,
      message,
      alias: 'ABC', //For now we put as static
      author,
    })
    return await this.messageEntityRepository.save(newMessage)
  }

  findOne(messageEntityId, userId) {
    return this.messageEntityRepository.findOne(messageEntityId, {
      relations: ['author'],
      where: { author: { id: userId } },
    })
  }

  findAll(userId) {
    return this.messageEntityRepository.find({
      relations: ['author'],
      where: { author: { id: userId } },
    })
  }
}
