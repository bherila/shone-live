import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Product } from '../products/entities/product.entity'
import { ProductRepository } from '../products/products.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { Payment } from './entities/payment.entity'
import { PaymentRepository } from './payment.repository'
import { PaymentResolver } from './payment.resolver'
import { PaymentService } from './payment.service'
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      PaymentRepository,
      Product,
      ProductRepository,
      User,
      UserRepository,
    ]),
  ],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}
