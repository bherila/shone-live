import { EntityRepository } from 'typeorm'

import { FindOrFailRepository } from '../common/find-or-fail.repository'
import { Order } from './entities/order.entity'

@EntityRepository(Order)
export class OrderRepository extends FindOrFailRepository<Order> {
  entityName = 'order'
}
