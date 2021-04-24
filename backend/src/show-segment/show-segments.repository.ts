import { EntityRepository } from 'typeorm'

import { FindOrFailRepository } from '../common/find-or-fail.repository'
import { ShowSegment } from './entities/show-segment.entity'

@EntityRepository(ShowSegment)
export class ShowSegmentRepository extends FindOrFailRepository<ShowSegment> {
  entityName = 'Show Segment'
}
