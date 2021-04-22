/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<9yeSYKRnu68jRR81DBRpgRd19lq3+mjF>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Transaction } from './transaction.entity'
import { TransactionsService } from './transaction.service'

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly TransactionsService: TransactionsService) {}

  @Query(() => Transaction, { nullable: true })
  transactionEntId(
    @Args('transactionEntId') transactionEntId: string /* UUID */,
  ) {
    return this.TransactionsService.getByEntId(transactionEntId)
  }

  @Query(() => [Transaction])
  transactions(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Transaction[]> {
    return this.TransactionsService.findAll(paginationQuery)
  }

  // @Mutation(() => Transaction)
  // async addTransaction(@Args('email') email: string) {
  //   return await this.TransactionsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
