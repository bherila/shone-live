import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Sku } from 'src/skus/entities/sku.entity';
import { StripeModule } from 'src/stripe/stripe.module';
import { User } from 'src/users/entities/user.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { ShowGateway } from './show.gateway';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Show, User, Product, Sku, Order]),
    StripeModule,
  ],
  controllers: [ShowsController],
  providers: [ShowsService, ShowGateway],
  exports: [ShowGateway],
})
export class ShowsModule {}
