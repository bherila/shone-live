import { EntityRepository } from 'typeorm'

import { FindOrFailRepository } from '../common/find-or-fail.repository'
import { LineItem } from './entities/line-item.entity'

@EntityRepository(LineItem)
export class LineItemsRepository extends FindOrFailRepository<LineItem> {
  entityName = 'LineItem'
}
