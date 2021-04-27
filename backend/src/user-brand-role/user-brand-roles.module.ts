import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BrandRepository } from '../brands/brands.repository'
import { Brand } from '../brands/entities/brand.entity'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { UserBrandRole } from './entities/user-brand-role.entity'
import { UserBrandRoleRepository } from './user-brand-roles.repository'
import { UserBrandRoleResolver } from './user-brand-roles.resolver'
import { UserBrandRolesService } from './user-brand-roles.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserBrandRole,
      Brand,
      User,
      UserBrandRoleRepository,
      BrandRepository,
      UserRepository,
    ]),
  ],
  providers: [UserBrandRolesService, UserBrandRoleResolver],
})
export class UserBrandRolesModule {}
