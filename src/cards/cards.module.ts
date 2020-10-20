import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '../addresses/entities/address.entity';
import { Order } from '../orders/entities/order.entity';
import { StripeModule } from '../stripe/stripe.module';
import { User } from '../users/entities/user.entity';
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
