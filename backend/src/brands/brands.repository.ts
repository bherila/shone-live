import { EntityRepository } from 'typeorm'

import { FindOrFailRepository } from '../common/find-or-fail.repository'
import { Brand } from './entities/brand.entity'

@EntityRepository(Brand)
export class BrandRepository extends FindOrFailRepository<Brand> {
  entityName = 'Brand'
}
