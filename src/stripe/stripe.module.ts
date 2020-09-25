import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeModule as StripeConnect } from 'nestjs-stripe';
import { StripeController } from './stripe.controller';

@Module({
  imports: [
    StripeConnect.forRoot({
        apiKey: process.env.STRIPE_DEV_KEY,
        apiVersion: '2020-08-27',
    }),
],
  providers: [StripeService],
  controllers: [StripeController]
})
export class StripeModule {}
