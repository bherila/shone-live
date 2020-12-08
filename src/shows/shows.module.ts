import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../orders/entities/order.entity';
import { PrivateFile } from '../private-files/entities/private-file.entity';
import { Product } from '../products/entities/product.entity';
import { Sku } from '../skus/entities/sku.entity';
import { StripeModule } from '../stripe/stripe.module';
import { User } from '../users/entities/user.entity';
import { Show } from './entities/show.entity';
import { ShowGateway } from './show.gateway';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Show, User, Product, Sku, Order, PrivateFile]),
    StripeModule,
  ],
  controllers: [ShowsController],
  providers: [ShowsService, ShowGateway],
  exports: [ShowGateway],
})
export class ShowsModule {}
