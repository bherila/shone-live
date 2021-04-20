import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Show } from '../show/entities/show.entity'
import { ShowRepository } from '../show/show.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { UserShowRole } from './entities/user-show-role.entity'
import { UserShowRoleRepository } from './user-show-roles.repository'
import { UserShowRoleResolver } from './user-show-roles.resolver'
import { UserShowRolesService } from './user-show-roles.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Show,
      ShowRepository,
      UserShowRole,
      User,
      UserShowRoleRepository,
      UserRepository,
    ]),
  ],
  providers: [UserShowRolesService, UserShowRoleResolver],
})
export class UserShowRolesModule {}
