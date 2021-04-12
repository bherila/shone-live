import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { AddressRepository } from './address.repository'
import { AddressResolver } from './address.resolver'
import { AddressService } from './address.service'
import { Address } from './entities/address.entity'
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Address,
      AddressRepository,
      User,
      UserRepository,
    ]),
  ],
  providers: [AddressResolver, AddressService],
})
export class AddressModule {}
