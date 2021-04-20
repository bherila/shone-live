/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<3KRHHrL8fEv2JXA7npHmtkgbuSRGeGHF>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { LoginRequestsService } from './login-request.service'
import { LoginRequest } from './login-request.entity'

@Resolver(() => LoginRequest)
export class LoginRequestsResolver {
  constructor(private readonly LoginRequestsService: LoginRequestsService) {}

  @Query(() => LoginRequest, { nullable: true })
  loginRequestEntId(
    @Args('loginRequestEntId') loginRequestEntId: string /* UUID */,
  ) {
    return this.LoginRequestsService.getByEntId(loginRequestEntId)
  }

  @Query(() => [LoginRequest])
  loginRequests(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<LoginRequest[]> {
    return this.LoginRequestsService.findAll(paginationQuery)
  }

  // @Mutation(() => LoginRequest)
  // async addLoginRequest(@Args('email') email: string) {
  //   return await this.LoginRequestsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
