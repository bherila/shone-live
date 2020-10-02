import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { Product } from 'src/products/entities/product.entity';
import { Show } from 'src/shows/entities/show.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Order } from 'src/orders/entities/order.entity';
import { UserAddress } from 'src/user-addresses/user-address.entity';
import { StripeModule } from 'src/stripe/stripe.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Show,
      Product,
      Card,
      Order,
      UserAddress
    ]),
    StripeModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
