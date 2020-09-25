import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderSku } from '../order-skus/entities/order-sku.entity';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from "../files/entities/file.entity";
import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import { Sku } from 'src/skus/entities/sku.entity';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderSku, Sku, File, Card, User])],
  providers: [OrdersService, StripeService],
  controllers: [OrdersController]
})
export class OrdersModule {}
