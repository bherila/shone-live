import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { MessageEntity } from './entities/message.entity'
import { MessageService } from './message.service'

@Resolver(() => MessageEntity)
export class MessageResolver {
  constructor(private readonly messageEntitysService: MessageService) {}

  @Query(() => MessageEntity, { nullable: true })
  messageEntity(@Args('messageEntityId') messageEntityId: number) {
    return this.messageEntitysService.findOne(messageEntityId)
  }

  @Query(() => [MessageEntity])
  messageEntities(): Promise<MessageEntity[]> {
    return this.messageEntitysService.findAll()
  }

  @Mutation(() => MessageEntity)
  async addMessage(
    @Args('show_id') show_id: number,
    @Args('message') message: string,
    @Args('user_id') user_id: number,
  ) {
    return await this.messageEntitysService.create(show_id, message, user_id)
  }
}
