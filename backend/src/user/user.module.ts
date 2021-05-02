import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AddressRepository } from '../address/address.repository'
import { Address } from '../address/entities/address.entity'
import { PaymentMethodEntity } from '../payment-method/entities/payment-method-entity'
import { PaymentMethodRepository } from '../payment-method/payment-method.repository'
import { User } from './entities/user.entity'
import { UserRepository } from './user.repository'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRepository,
      Address,
      AddressRepository,
      PaymentMethodRepository,
      PaymentMethodEntity,
    ]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
