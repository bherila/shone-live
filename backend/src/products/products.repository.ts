import { EntityRepository } from 'typeorm'

import { FindOrFailRepository } from '../common/find-or-fail.repository'
import { Product } from './entities/product.entity'

@EntityRepository(Product)
export class ProductRepository extends FindOrFailRepository<Product> {
  entityName = 'Product'
}
