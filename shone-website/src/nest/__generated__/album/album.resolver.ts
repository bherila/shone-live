/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<2xCXNR1v/onmkbrwF8t9bLctFRreUmwo>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Album } from './album.entity'
import { AlbumsService } from './album.service'

@Resolver(() => Album)
export class AlbumsResolver {
  constructor(private readonly AlbumsService: AlbumsService) {}

  @Query(() => Album, { nullable: true })
  albumEntId(@Args('albumEntId') albumEntId: string /* UUID */) {
    return this.AlbumsService.getByEntId(albumEntId)
  }

  @Query(() => [Album])
  albums(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Album[]> {
    return this.AlbumsService.findAll(paginationQuery)
  }

  // @Mutation(() => Album)
  // async addAlbum(@Args('email') email: string) {
  //   return await this.AlbumsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
