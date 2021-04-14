import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { MessageEntity } from './entities/message.entity'
import { MessageService } from './message.service'

@Resolver(() => MessageEntity)
export class MessageResolver {
  constructor(private readonly messageEntitysService: MessageService) {}

  @Query(() => MessageEntity, { nullable: true })
  @UseGuards(new AuthGuard())
  messageEntity(
    @Context('user') user,
    @Args('messageEntityId') messageEntityId: number,
  ) {
    return this.messageEntitysService.findOne(messageEntityId, user.id)
  }

  @Query(() => [MessageEntity])
  @UseGuards(new AuthGuard())
  messageEntities(@Context('user') user): Promise<MessageEntity[]> {
    return this.messageEntitysService.findAll(user.id)
  }

  @Mutation(() => MessageEntity)
  @UseGuards(new AuthGuard())
  async add_message(
    @Args('showId') showId: number,
    @Args('message') message: string,
    @Context('user') user,
  ) {
    return await this.messageEntitysService.create(showId, message, user.id)
  }
}
