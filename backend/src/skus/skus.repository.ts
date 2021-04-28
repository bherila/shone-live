import { EntityRepository } from 'typeorm'

import { FindOrFailRepository } from '../common/find-or-fail.repository'
import { Sku } from './entities/sku.entity'

@EntityRepository(Sku)
export class SkuRepository extends FindOrFailRepository<Sku> {
  entityName = 'Sku'
}
