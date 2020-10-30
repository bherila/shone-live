import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Auth } from '../auth/entities/auth.entity';
import { Card } from '../cards/entities/card.entity';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { Show } from '../shows/entities/show.entity';
import { StripeModule } from '../stripe/stripe.module';
import { UserAddress } from '../user-addresses/user-address.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([
      Auth,
      Card,
      Order,
      Product,
      Show,
      User,
      UserAddress,
    ]),
    StripeModule,
  ],
  providers: [UsersService],
})
export class UsersModule {}
