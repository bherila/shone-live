import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Card } from './entities/card.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Card, Order])],
  providers: [CardsService, StripeService],
  controllers: [CardsController]
})
export class CardsModule {}
