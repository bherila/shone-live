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
    @Args('showId') showId: number,
    @Args('message') message: string,
    @Args('userId') userId: number,
  ) {
    return await this.messageEntitysService.create(showId, message, userId)
  }
}
