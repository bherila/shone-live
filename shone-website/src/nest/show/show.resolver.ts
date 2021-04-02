import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { CreateShowInput } from './entities/createShow.entity'
import { Show } from './entities/show.entity'
import { ShowService } from './show.service'
@Service()
@Resolver(() => Show)
export class ShowResolver {
  constructor(
    @InjectRepository(Show) private readonly showRepository: Repository<Show>,
    private readonly showsService: ShowService,
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
