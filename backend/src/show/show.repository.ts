import { EntityRepository } from 'typeorm'

import { FindOrFailRepository } from '../common/find-or-fail.repository'
import { Show } from './entities/show.entity'

@EntityRepository(Show)
export class ShowRepository extends FindOrFailRepository<Show> {
  entityName = 'Show'
}
