import { EntityRepository } from 'typeorm'

import { FindOrFailRepository } from '../common/find-or-fail.repository'
import { User } from './entities/user.entity'

@EntityRepository(User)
export class UserRepository extends FindOrFailRepository<User> {
  entityName = 'User'
}
