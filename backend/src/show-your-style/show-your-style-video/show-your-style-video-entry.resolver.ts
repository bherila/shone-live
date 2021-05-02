import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../../common/auth.guards'
import { User } from '../../user/entities/user.entity'
import { ShowYourStyleVideoIdEntry } from '../show-your-style-entry/entities/show-your-style-video-entry.entity'
import { StyleVideoService } from './show-your-style-video.service'
@Resolver(() => ShowYourStyleVideoIdEntry)
export class ShowYourStyleVideoIdEntryResolver {
  constructor(private readonly showYourStyleVideoService: StyleVideoService) {}

  @Mutation(() => ShowYourStyleVideoIdEntry)
  @UseGuards(new AuthGuard())
  async deactivate_video(
    @Context('user') user: User,
    @Args('videoId') videoId: string,
  ) {
    try {
      return await this.showYourStyleVideoService.deactivateVideo(
        user.id,
        videoId,
      )
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
