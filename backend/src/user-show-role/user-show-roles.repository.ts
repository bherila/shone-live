import { MethodNotAllowedException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'

import { UserShowRole } from './entities/user-show-role.entity'

@EntityRepository(UserShowRole)
export class UserShowRoleRepository extends Repository<UserShowRole> {
  async checkPermission(id: string, userId: string, permission: string) {
    const userShowRole = await this.findOne({
      where: { show: { id }, user: { id: userId }, [permission]: true },
    })
    if (!userShowRole) {
      throw new MethodNotAllowedException(`You are not allowed to do this`)
    }
    return userShowRole
  }
}
