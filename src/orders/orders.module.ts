import { AddressesModule } from 'src/addresses/addresses.module';
import { Card } from 'src/cards/entities/card.entity';
import { File } from '../files/entities/file.entity';
import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrderSku } from '../order-skus/entities/order-sku.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Show } from 'src/shows/entities/show.entity';
import { ShowsModule } from 'src/shows/shows.module';
import { Sku } from 'src/skus/entities/sku.entity';
import { StripeModule } from 'src/stripe/stripe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderSku, Sku, File, Card, User, Show]),
    StripeModule,
    AddressesModule,
    ShowsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
