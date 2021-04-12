import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateShowInput } from './entities/createShow.entity'
import { Show } from './entities/show.entity'
import { ShowService } from './show.service'

@Resolver(() => Show)
export class ShowResolver {
  constructor(private readonly showsService: ShowService) {}

  @Query(() => Show, { nullable: true })
  show(@Args('showId') showId: number) {
    return this.showsService.findOne(showId)
  }

  @Query(() => [Show])
  shows(): Promise<Show[]> {
    return this.showsService.findAll()
  }

  @Mutation(() => Show)
  async add_show(@Args('data') data: CreateShowInput) {
    return await this.showsService.create(data)
  }
}
