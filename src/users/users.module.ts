import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { Product } from 'src/products/entities/product.entity';
import { Show } from 'src/shows/entities/show.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { Card } from 'src/cards/entities/card.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Show, Product, Card, Order])],
  controllers: [UsersController],
  providers: [UsersService, StripeService],
  exports: [UsersService],
})
export class UsersModule { }
