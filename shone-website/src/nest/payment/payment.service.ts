import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Product } from '../products/entities/product.entity'
import { ProductRepository } from '../products/products.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { Payment } from './entities/payment.entity'
import { PaymentRepository } from './payment.repository'

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: PaymentRepository,

    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}
  async create(productId, quantity, userId): Promise<Payment> {
    const product = await this.productRepository.findOne(productId)
    const user = await this.userRepository.findOne(userId)
    const newPayment = await this.paymentRepository.create({
      product,
      user,
      quantity,
    })
    return await this.paymentRepository.save(newPayment)
  }

  findOne(paymentId) {
    return this.paymentRepository.findOne(paymentId, {
      relations: ['user', 'product'],
    })
  }

  findAll() {
    return this.paymentRepository.find({ relations: ['user', 'product'] })
  }
}
