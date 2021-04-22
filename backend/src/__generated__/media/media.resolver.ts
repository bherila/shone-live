/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<AluzY9xVIdYpLSJLFGiYqCEHT4rbhtZ4>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { MediaService } from './media.service'
import { Media } from './media.entity'

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly MediaService: MediaService) {}

  @Query(() => Media, { nullable: true })
  mediaEntId(@Args('mediaEntId') mediaEntId: string /* UUID */) {
    return this.MediaService.getByEntId(mediaEntId)
  }

  @Query(() => [Media])
  media(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Media[]> {
    return this.MediaService.findAll(paginationQuery)
  }

  // @Mutation(() => Media)
  // async addMedia(@Args('email') email: string) {
  //   return await this.MediaService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
