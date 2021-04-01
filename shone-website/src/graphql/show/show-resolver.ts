import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { CreateShowInput } from './create-show-entity'
import { Show } from './show-entity'
import { showService } from './show-service'
@Service()
@Resolver(() => Show)
export class ShowResolver {
  constructor(
    @InjectRepository(Show) private readonly showRepository: Repository<Show>,
    private readonly showsService: showService,
  ) {}

  @Query(() => Show, { nullable: true })
  show(@Arg('showId', () => Int) showId: number) {
    return this.showRepository.findOne(showId, { relations: ['chatMessages'] })
  }

  @Query(() => [Show])
  shows(): Promise<Show[]> {
    return this.showRepository.find({ relations: ['chatMessages'] })
  }

  @Mutation(() => Show)
  async addShow(@Arg('data') data: CreateShowInput) {
    return await this.showsService.create(data)
  }
}
