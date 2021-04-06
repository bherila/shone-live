import { Injectable } from '@nestjs/common'

import { ShowRepository } from '../show/show.repository'
import { UserRepository } from '../user/user.repository'
import { MessageEntity } from './entities/message.entity'
import { MessageRepository } from './message.repository'

@Injectable()
export class MessageService {
  constructor(
    private readonly messageEntityRepository: MessageRepository,
    private readonly showRepository: ShowRepository,
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
