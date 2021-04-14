import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Payment } from './entities/payment.entity'
import { PaymentService } from './payment.service'

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => Payment, { nullable: true })
  payment(@Args('PaymentId') PaymentId: number) {
    return this.paymentService.findOne(PaymentId)
  }

  @Query(() => [Payment])
  payments() {
    return this.paymentService.findAll()
  }

  @Mutation(() => Payment)
  async addPayment(
    @Args('productId') productId: number,
    @Args('quantity') quantity: string,
    @Args('userId') userId: number,
  ) {
    return await this.paymentService.create(productId, quantity, userId)
  }
}
