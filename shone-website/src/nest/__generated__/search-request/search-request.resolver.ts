/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<Hvqda7j4Wn8g90vClHvkptAAUWOeted2>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { SearchRequest } from './search-request.entity'
import { SearchRequestsService } from './search-request.service'

@Resolver(() => SearchRequest)
export class SearchRequestsResolver {
  constructor(private readonly SearchRequestsService: SearchRequestsService) {}

  @Query(() => SearchRequest, { nullable: true })
  searchRequestEntId(
    @Args('searchRequestEntId') searchRequestEntId: string /* UUID */,
  ) {
    return this.SearchRequestsService.getByEntId(searchRequestEntId)
  }

  @Query(() => [SearchRequest])
  searchRequests(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<SearchRequest[]> {
    return this.SearchRequestsService.findAll(paginationQuery)
  }

  // @Mutation(() => SearchRequest)
  // async addSearchRequest(@Args('email') email: string) {
  //   return await this.SearchRequestsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
