import { EntityRepository, Repository } from 'typeorm'

import { UserBrandRole } from './entities/user-brand-role.entity'

@EntityRepository(UserBrandRole)
export class UserBrandRoleRepository extends Repository<UserBrandRole> {}
