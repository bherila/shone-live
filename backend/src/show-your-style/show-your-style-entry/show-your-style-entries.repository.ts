import { EntityRepository, Repository } from 'typeorm'

import { ShowYourStyleEntry } from './entities/show-your-style-entry.entity'
import { ShowYourStyleVideoIdEntry } from './entities/show-your-style-entry.entity'

@EntityRepository(ShowYourStyleEntry)
export class ShowYourStyleEntriesRepository extends Repository<ShowYourStyleEntry> {}

@EntityRepository(ShowYourStyleVideoIdEntry)
export class ShowYourStyleVideoIdEntriesRepository extends Repository<ShowYourStyleVideoIdEntry> {}
