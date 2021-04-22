/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<Qa0iBHh75VTTGF3LfpHzOE2LVXhwlojr>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { LoginResponsesService } from './login-response.service'
import { LoginResponse } from './login-response.entity'

@Resolver(() => LoginResponse)
export class LoginResponsesResolver {
  constructor(private readonly LoginResponsesService: LoginResponsesService) {}

  @Query(() => LoginResponse, { nullable: true })
  loginResponseEntId(
    @Args('loginResponseEntId') loginResponseEntId: string /* UUID */,
  ) {
    return this.LoginResponsesService.getByEntId(loginResponseEntId)
  }

  @Query(() => [LoginResponse])
  loginResponses(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<LoginResponse[]> {
    return this.LoginResponsesService.findAll(paginationQuery)
  }

  // @Mutation(() => LoginResponse)
  // async addLoginResponse(@Args('email') email: string) {
  //   return await this.LoginResponsesService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
