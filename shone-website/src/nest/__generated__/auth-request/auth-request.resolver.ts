/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<uDUOwRiNDz04JG0qEw49HwBYZziJrUwn>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { AuthRequestsService } from './auth-request.service'
import { AuthRequest } from './auth-request.entity'

@Resolver(() => AuthRequest)
export class AuthRequestsResolver {
  constructor(private readonly AuthRequestsService: AuthRequestsService) {}

  @Query(() => AuthRequest, { nullable: true })
  authRequestEntId(
    @Args('authRequestEntId') authRequestEntId: string /* UUID */,
  ) {
    return this.AuthRequestsService.getByEntId(authRequestEntId)
  }

  @Query(() => [AuthRequest])
  authRequests(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<AuthRequest[]> {
    return this.AuthRequestsService.findAll(paginationQuery)
  }

  // @Mutation(() => AuthRequest)
  // async addAuthRequest(@Args('email') email: string) {
  //   return await this.AuthRequestsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
