import { EntityRepository, Repository } from 'typeorm'

import { ShowSegment } from './entities/show-segment.entity'

@EntityRepository(ShowSegment)
export class ShowSegmentRepository extends Repository<ShowSegment> {}
