import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShowRepository } from '../show/show.repository'
import { UserRepository } from '../user/user.repository'

import { MessageEntity } from './entities/message.entity'
import { MessageRepository } from './message.repository'
import { MessageResolver } from './message.resolver'
import { MessageService } from './message.service'
@Module({
  imports: [TypeOrmModule.forFeature([ MessageEntity, MessageRepository, UserRepository, ShowRepository])],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
