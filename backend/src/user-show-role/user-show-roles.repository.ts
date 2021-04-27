import { EntityRepository, Repository } from 'typeorm'

import { UserShowRole } from './entities/user-show-role.entity'

@EntityRepository(UserShowRole)
export class UserShowRoleRepository extends Repository<UserShowRole> {}
