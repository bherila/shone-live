import { EntityRepository, Repository } from 'typeorm'

import { ShowYourStyleViewRecord } from './entities/show-your-style-view-record.entity'

@EntityRepository(ShowYourStyleViewRecord)
export class ShowYourStyleViewRecordsRepository extends Repository<ShowYourStyleViewRecord> {}
