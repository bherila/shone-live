import { MethodNotAllowedException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'

import { UserBrandRole } from './entities/user-brand-role.entity'

@EntityRepository(UserBrandRole)
export class UserBrandRoleRepository extends Repository<UserBrandRole> {
  async checkPermission(id: string, userId: string, permission: string) {
    const userBrandRole = await this.findOne({
      where: { brand: { id }, user: { id: userId }, [permission]: true },
    })
    if (!userBrandRole) {
      throw new MethodNotAllowedException(`You are not allowed to do this`)
    }
    return userBrandRole
  }
}
