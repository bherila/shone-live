import { EntityRepository, Repository } from 'typeorm'

import { ShowYourStyleEntry } from './entities/show-your-style-entry.entity'

@EntityRepository(ShowYourStyleEntry)
export class ShowYourStyleEntriesRepository extends Repository<ShowYourStyleEntry> {}
