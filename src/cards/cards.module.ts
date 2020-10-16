import { Address } from 'src/addresses/entities/address.entity';
import { Order } from 'src/orders/entities/order.entity';
import { StripeModule } from 'src/stripe/stripe.module';
import { User } from 'src/users/entities/user.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Card, Order, Address]),
    StripeModule,
  ],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
