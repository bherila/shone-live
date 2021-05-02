import { EntityRepository, Repository } from 'typeorm'

import { ShowYourStyleVideoIdEntry } from '../show-your-style-entry/entities/show-your-style-video-entry.entity'

@EntityRepository(ShowYourStyleVideoIdEntry)
export class ShowYourStyleVideoIdEntriesRepository extends Repository<ShowYourStyleVideoIdEntry> {}
