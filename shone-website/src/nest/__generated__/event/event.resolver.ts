/**
 * This file is generated with manually editable sections. Only make
 * modifications between BEGIN MANUAL SECTION and END MANUAL SECTION
 * designators.
 *
 * @generated-editable Codelock<<FgZTfvoHWWzUuUxgyOkcb0NxroMj3+w+>>
 */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'
import { Event } from './event.entity'
import { EventsService } from './event.service'

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly EventsService: EventsService) {}

  @Query(() => Event, { nullable: true })
  eventEntId(@Args('eventEntId') eventEntId: string /* UUID */) {
    return this.EventsService.getByEntId(eventEntId)
  }

  @Query(() => [Event])
  events(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Event[]> {
    return this.EventsService.findAll(paginationQuery)
  }

  // @Mutation(() => Event)
  // async addEvent(@Args('email') email: string) {
  //   return await this.EventsService.create({
  //     email,
  //   })
  // }
  /* BEGIN MANUAL SECTION RESOLVERS */
  // Add custom resolver here?
  /* END MANUAL SECTION */
}
