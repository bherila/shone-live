/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<d+4pahbyvLvurfsNZJMvtvNc5LE1Xy58>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { PageOrdersService } from './page-order.service'
import { PageOrder } from './page-order.entity'

@Resolver(() => PageOrder)
export class PageOrdersResolver {
  constructor(private readonly PageOrdersService: PageOrdersService) {}

  @Query(() => PageOrder, { nullable: true })
  pageOrderEntId(@Args('pageOrderEntId') pageOrderEntId: string /* UUID */) {
    return this.PageOrdersService.getByEntId(pageOrderEntId)
  }

  @Query(() => [PageOrder])
  pageOrders(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<PageOrder[]> {
    return this.PageOrdersService.findAll(paginationQuery)
  }

  // @Mutation(() => PageOrder)
  // async addPageOrder(@Args('email') email: string) {
  //   return await this.PageOrdersService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
