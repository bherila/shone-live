import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { Payment } from './entities/payment.entity'
import { PaymentService } from './payment.service'

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => Payment, { nullable: true })
  @UseGuards(new AuthGuard())
  payment(@Context('user') user, @Args('PaymentId') PaymentId: string) {
    return this.paymentService.findOne(PaymentId, user.id)
  }

  @Query(() => [Payment])
  @UseGuards(new AuthGuard())
  payments(@Context('user') user) {
    return this.paymentService.findAll(user.id)
  }

  @Mutation(() => Payment)
  @UseGuards(new AuthGuard())
  async add_payment(
    @Context('user') user,
    @Args('productId') productId: string,
    @Args('quantity') quantity: string,
  ) {
    return await this.paymentService.create(productId, quantity, user.id)
  }
}
