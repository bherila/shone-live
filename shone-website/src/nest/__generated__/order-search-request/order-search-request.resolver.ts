/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<ZKgb3Gl0qHE8OENFTpX4DnmBepcC/g5Q>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { OrderSearchRequest } from './order-search-request.entity'
import { OrderSearchRequestsService } from './order-search-request.service'

@Resolver(() => OrderSearchRequest)
export class OrderSearchRequestsResolver {
  constructor(
    private readonly OrderSearchRequestsService: OrderSearchRequestsService,
  ) {}

  @Query(() => OrderSearchRequest, { nullable: true })
  orderSearchRequestEntId(
    @Args('orderSearchRequestEntId') orderSearchRequestEntId: string /* UUID */,
  ) {
    return this.OrderSearchRequestsService.getByEntId(orderSearchRequestEntId)
  }

  @Query(() => [OrderSearchRequest])
  orderSearchRequests(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<OrderSearchRequest[]> {
    return this.OrderSearchRequestsService.findAll(paginationQuery)
  }

  // @Mutation(() => OrderSearchRequest)
  // async addOrderSearchRequest(@Args('email') email: string) {
  //   return await this.OrderSearchRequestsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
