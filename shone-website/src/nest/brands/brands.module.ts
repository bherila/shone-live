import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Product } from '../products/entities/product.entity'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { UserBrandRole } from '../user-brand-role/entities/user-brand-role.entity'
import { UserBrandRoleRepository } from '../user-brand-role/user-brand-roles.repository'
import { BrandRepository } from './brands.repository'
import { BrandResolver } from './brands.resolver'
import { BrandsService } from './brands.service'
import { Brand } from './entities/brand.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserBrandRole,
      Brand,
      User,
      Product,
      BrandRepository,
      UserRepository,
      UserBrandRoleRepository,
    ]),
  ],
  providers: [BrandsService, BrandResolver],
})
export class BrandsModule {}
