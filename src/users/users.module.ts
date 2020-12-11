import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Auth } from '../auth/entities/auth.entity';
import { Card } from '../cards/entities/card.entity';
import { PublicFile } from '../files-public/entities/public-file.entity';
import { PublicFilesModule } from '../files-public/public-files.module';
import { File } from '../files/entities/file.entity';
import { FilesModule } from '../files/files.module';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { Show } from '../shows/entities/show.entity';
import {
  SimpleProduct,
} from '../simple-products/entities/simple-product.entity';
import { Sku } from '../skus/entities/sku.entity';
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
      File,
      Product,
      PublicFile,
      Show,
      SimpleProduct,
      Sku,
      User,
      UserAddress,
    ]),
    PublicFilesModule,
    FilesModule,
    StripeModule,
  ],
  providers: [UsersService],
})
export class UsersModule {}
