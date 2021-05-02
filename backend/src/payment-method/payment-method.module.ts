import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AddressRepository } from '../address/address.repository'
import { Address } from '../address/entities/address.entity'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { PaymentMethodEntity } from './entities/payment-method-entity'
import { PaymentMethodRepository } from './payment-method.repository'
import { PaymentMethodResolver } from './payment-method.resolver'
import { PaymentMethodService } from './payment-method.service'
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentMethodEntity,
      PaymentMethodRepository,
      Address,
      AddressRepository,
      UserRepository,
      User,
    ]),
  ],
  providers: [PaymentMethodService, PaymentMethodResolver],
})
export class PaymentMethodModule {}
