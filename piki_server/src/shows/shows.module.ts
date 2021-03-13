import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgoraRtmToken } from '../agora/entities/agora-rtm-token.entity';
import { File } from '../files/entities/file.entity';
import { FilesModule } from '../files/files.module';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import {
  SimpleProduct,
} from '../simple-products/entities/simple-product.entity';
import {
  SimpleProductsModule,
} from '../simple-products/simple-products.module';
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
      AgoraRtmToken,
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
  exports: [ShowsService, ShowGateway],
})
export class ShowsModule {}
