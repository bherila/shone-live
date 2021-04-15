import { EntityRepository, Repository } from 'typeorm'

import { ShowYourStyleVote } from './entities/show-your-style-vote.entity'

@EntityRepository(ShowYourStyleVote)
export class ShowYourStyleVotesRepository extends Repository<ShowYourStyleVote> {}
