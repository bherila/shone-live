import { EntityRepository } from 'typeorm'

import { FindOrFailRepository } from '../common/find-or-fail.repository'
import { Address } from './entities/address.entity'

@EntityRepository(Address)
export class AddressRepository extends FindOrFailRepository<Address> {
  entityName = 'Address'
}
