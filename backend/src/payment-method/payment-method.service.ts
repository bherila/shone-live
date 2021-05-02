/* eslint-disable prettier/prettier */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-empty-function */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Stripe from 'stripe'

import { AddressRepository } from '../address/address.repository'
import { Address } from '../address/entities/address.entity'
import { message } from '../common/message';
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { PaymentMethodEntity } from './entities/payment-method-entity'
import { PaymentMethodRepository } from './payment-method.repository'

// const stripe = new Stripe(process.env.STRIPE_KEY);
@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(Address)
    private readonly addressRepositroy: AddressRepository,
    @InjectRepository(PaymentMethodEntity)
    private readonly paymentMethodRepository: PaymentMethodRepository,

  ) {

  }

  stripe = new Stripe(
    process.env.STRIPE_KEY.toString(),
    {
      apiVersion: '2020-08-27',
      typescript: true,
    },
  );

  async addPaymentMethodToUser(paymentDetails, userId) :Promise<PaymentMethodEntity>{
      const { addressId, expiryDate, cvc, cardNumber, cardName } = paymentDetails;
      const checkForUserDetails=await this.userRepository.findOneOrFail(userId)
      await this.addressRepositroy.findOneOrFail(addressId);
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: cardNumber,
          exp_month: expiryDate.split('-')[1],
          exp_year: expiryDate.split('-')[0],
          cvc: cvc,
        }
      });

      const getAllPaymentMethodsForUser = await this.paymentMethodRepository.find({ userId })
      if (paymentMethod.id) {
        const addPaymentMethodObj = {
          userId,
          cardName,
          paymentMethodId: paymentMethod.id,
          addressId,
          isDeleted: false
        }
      
        const paymentMethodAttach = await this.stripe.paymentMethods.attach(paymentMethod.id, { customer: checkForUserDetails.stripeCustomerId});
        if (!paymentMethodAttach.id) {
          throw new BadRequestException(`Payment method id - ${paymentMethod.id} not attached to user`);
        }
        
        const addedPaymentMethod = await this.paymentMethodRepository.save(addPaymentMethodObj);
        if (getAllPaymentMethodsForUser && !getAllPaymentMethodsForUser.length) {
          await this.userRepository.update({id:userId},
            {
              defaultPaymentMethodId:addedPaymentMethod.id.toString()
            })
        }
        return await this.paymentMethodRepository.findOne({ id: addedPaymentMethod.id })
      }
    


  }

  async deletePaymentMethodFromUser(paymentMethodId:string, userId:string) {
    const checkForUserDetails=await this.userRepository.findOneOrFail(userId.toString())
    const getUserPaymentMethodDetails = await this.paymentMethodRepository.findOne({ id: paymentMethodId.toString() });
    if (!getUserPaymentMethodDetails) {
      throw new NotFoundException(`Payment Method  for id -  ${paymentMethodId} not found`);
    }
    if (getUserPaymentMethodDetails.id===checkForUserDetails.defaultPaymentMethodId) {
      throw new BadRequestException(`Payment method id - ${paymentMethodId} is default method ,so you can not delete it`);
    }

    if(getUserPaymentMethodDetails.isDeleted)
    {
      throw new NotFoundException(`Payment method id - ${paymentMethodId} was not found`);
    }
    const paymentMethodDetach = await this.stripe.paymentMethods.detach(getUserPaymentMethodDetails.paymentMethodId.toString());
    if (!paymentMethodDetach.id) {
      throw new InternalServerErrorException(`Payment method id - ${paymentMethodId} is not detched from customer`);
    }

    await this.paymentMethodRepository.update({ id: paymentMethodId.toString()},
      {
        isDeleted: true
      })

    return { msg: message.paymentMethodDeletionSuccess }

  }

  async getAllPaymentMethodsForUser(userId) {
    await this.userRepository.findOneOrFail(userId);
    return await this.paymentMethodRepository.find({ userId });
  }
}
