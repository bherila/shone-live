import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { BrandRepository } from './brands.repository'
import { BrandResolver } from './brands.resolver'
import { BrandsService } from './brands.service'
import { Brand } from './entities/brand.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand, User, BrandRepository, UserRepository]),
  ],
  providers: [BrandsService, BrandResolver],
})
export class BrandsModule {}
