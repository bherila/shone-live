import {
  SimpleProductsModule,
} from 'src/simple-products/simple-products.module';

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
import { FilesModule } from '../files/files.module';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import {
  SimpleProduct,
} from '../simple-products/entities/simple-product.entity';
import { Sku } from '../skus/entities/sku.entity';
import { StripeModule } from '../stripe/stripe.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { Show } from './entities/show.entity';
import { ShowGateway } from './show.gateway';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Show,
      User,
      Product,
      SimpleProduct,
      Sku,
      Order,
      File,
    ]),
    StripeModule,
    FilesModule,
    UsersModule,
    forwardRef(() => SimpleProductsModule),
  ],
  controllers: [ShowsController],
  providers: [ShowsService, ShowGateway],
  exports: [ShowGateway],
})
export class ShowsModule {}
