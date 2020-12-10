import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressesModule } from '../addresses/addresses.module';
import { Card } from '../cards/entities/card.entity';
import { OrderSku } from '../order-skus/entities/order-sku.entity';
import { Show } from '../shows/entities/show.entity';
import { ShowsModule } from '../shows/shows.module';
import { Sku } from '../skus/entities/sku.entity';
import { StripeModule } from '../stripe/stripe.module';
import { User } from '../users/entities/user.entity';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderSku, Sku, Card, User, Show]),
    StripeModule,
    AddressesModule,
    ShowsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
