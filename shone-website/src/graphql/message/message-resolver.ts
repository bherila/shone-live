import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { MessageEntity } from './message-entity'
import { MessageService } from './message-service'
@Service()
@Resolver(() => MessageEntity)
export class MessageEntityResolver {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageEntityRepository: Repository<MessageEntity>,
    private readonly messageEntitysService: MessageService,
  ) {}

  @Query(() => MessageEntity, { nullable: true })
  messageEntity(@Arg('messageEntityId', () => Int) messageEntityId: number) {
    return this.messageEntityRepository.findOne(messageEntityId)
  }

  @Query(() => [MessageEntity])
  messageEntitys(): Promise<MessageEntity[]> {
    return this.messageEntityRepository.find()
  }

  @Mutation(() => MessageEntity)
  async addMessage(
    @Arg('show_id') show_id: string,
    @Arg('message') message: string,
    @Arg('user_id') user_id: string,
  ) {
    return await this.messageEntitysService.create(show_id, message, user_id)
  }
}
