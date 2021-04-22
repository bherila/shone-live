/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<Zycb6SxStTAvIN3FuIG5N1JQhFI67Jsp>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { CurrentPaymentToken } from './current-payment-token.entity'
import { CurrentPaymentTokensService } from './current-payment-token.service'

@Resolver(() => CurrentPaymentToken)
export class CurrentPaymentTokensResolver {
  constructor(
    private readonly CurrentPaymentTokensService: CurrentPaymentTokensService,
  ) {}

  @Query(() => CurrentPaymentToken, { nullable: true })
  currentPaymentTokenEntId(
    @Args('currentPaymentTokenEntId')
    currentPaymentTokenEntId: string /* UUID */,
  ) {
    return this.CurrentPaymentTokensService.getByEntId(currentPaymentTokenEntId)
  }

  @Query(() => [CurrentPaymentToken])
  currentPaymentTokens(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<CurrentPaymentToken[]> {
    return this.CurrentPaymentTokensService.findAll(paginationQuery)
  }

  // @Mutation(() => CurrentPaymentToken)
  // async addCurrentPaymentToken(@Args('email') email: string) {
  //   return await this.CurrentPaymentTokensService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
