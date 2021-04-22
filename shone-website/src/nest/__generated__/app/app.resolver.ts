/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<x85I6nX/RTLjc8stBajPeLciygbyWw18>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { App } from './app.entity'
import { AppsService } from './app.service'

@Resolver(() => App)
export class AppsResolver {
  constructor(private readonly AppsService: AppsService) {}

  @Query(() => App, { nullable: true })
  appEntId(@Args('appEntId') appEntId: string /* UUID */) {
    return this.AppsService.getByEntId(appEntId)
  }

  @Query(() => [App])
  apps(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<App[]> {
    return this.AppsService.findAll(paginationQuery)
  }

  // @Mutation(() => App)
  // async addApp(@Args('email') email: string) {
  //   return await this.AppsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
