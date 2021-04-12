import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Payment } from './entities/payment.entity'
import { PaymentService } from './payment.service'

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => Payment, { nullable: true })
  Payment(@Args('PaymentId') PaymentId: number) {
    return this.paymentService.findOne(PaymentId)
  }

  @Query(() => [Payment])
  Payments() {
    return this.paymentService.findAll()
  }

  @Mutation(() => Payment)
  async addPayment(
    @Args('product_id') product_id: number,
    @Args('quantity') quantity: string,
    @Args('user_id') user_id: number,
  ) {
    return await this.paymentService.create(product_id, quantity, user_id)
  }
}
