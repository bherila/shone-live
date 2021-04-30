import { EntityRepository } from 'typeorm'

import { FindOrFailRepository } from '../common/find-or-fail.repository'
import { Variant } from './entities/variant.entity'

@EntityRepository(Variant)
export class VariantRepository extends FindOrFailRepository<Variant> {
  entityName = 'Variant'
}
