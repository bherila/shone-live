/* eslint-disable @typescript-eslint/ban-types */
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { AddPaymentMethodDto } from './dtos/add-payment-method-input-dto'
import { DeletePaymentMethodOutputDto } from './dtos/delete-payment-method-output.dto'
import { PaymentMethodEntity } from './entities/payment-method-entity'
import { PaymentMethodService } from './payment-method.service'

@Resolver(() => PaymentMethodEntity)
export class PaymentMethodResolver {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Mutation(() => PaymentMethodEntity)
  @UseGuards(new AuthGuard())
  async addPaymentMethod(
    @Args('addPaymentDetails') addPaymentDetails: AddPaymentMethodDto,
    @Context('user') user,
  ) {
    try {
      return await this.paymentMethodService.addPaymentMethodToUser(
        addPaymentDetails,
        user.id,
      )
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Mutation(() => DeletePaymentMethodOutputDto)
  @UseGuards(new AuthGuard())
  async deletePaymentMethod(
    @Args('id') paymentMethodId: string,
    @Context('user') user,
  ) {
    try {
      return await this.paymentMethodService.deletePaymentMethodFromUser(
        paymentMethodId,
        user.id,
      )
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Query(() => [PaymentMethodEntity])
  @UseGuards(new AuthGuard())
  async paymentMethods(@Context('user') user) {
    try {
      return this.paymentMethodService.getAllPaymentMethodsForUser(user.id)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
