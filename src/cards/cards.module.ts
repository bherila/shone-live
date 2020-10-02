import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Card } from './entities/card.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { StripeModule } from 'src/stripe/stripe.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Card,
      Order,
      Address
    ]),
    StripeModule,
  ],
  providers: [CardsService],
  controllers: [CardsController]
})
export class CardsModule {}
