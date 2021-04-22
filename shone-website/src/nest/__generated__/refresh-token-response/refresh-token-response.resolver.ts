/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<zDhcqlRCXIAz52p3X3QKpBJ9yWgxx+Zb>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { RefreshTokenResponse } from './refresh-token-response.entity'
import { RefreshTokenResponsesService } from './refresh-token-response.service'

@Resolver(() => RefreshTokenResponse)
export class RefreshTokenResponsesResolver {
  constructor(
    private readonly RefreshTokenResponsesService: RefreshTokenResponsesService,
  ) {}

  @Query(() => RefreshTokenResponse, { nullable: true })
  refreshTokenResponseEntId(
    @Args('refreshTokenResponseEntId')
    refreshTokenResponseEntId: string /* UUID */,
  ) {
    return this.RefreshTokenResponsesService.getByEntId(
      refreshTokenResponseEntId,
    )
  }

  @Query(() => [RefreshTokenResponse])
  refreshTokenResponses(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<RefreshTokenResponse[]> {
    return this.RefreshTokenResponsesService.findAll(paginationQuery)
  }

  // @Mutation(() => RefreshTokenResponse)
  // async addRefreshTokenResponse(@Args('email') email: string) {
  //   return await this.RefreshTokenResponsesService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
