import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AgoraRtmToken } from "../agora/entities/agora-rtm-token.entity";
import { Auth } from "../auth/entities/auth.entity";
import { Card } from "../cards/entities/card.entity";
import { File } from "../files/entities/file.entity";
import { FilesModule } from "../files/files.module";
import { Order } from "../orders/entities/order.entity";
import { Product } from "../products/entities/product.entity";
import { Show } from "../shows/entities/show.entity";
import { SimpleProduct } from "../simple-products/entities/simple-product.entity";
import { Sku } from "../skus/entities/sku.entity";
import { StripeModule } from "../stripe/stripe.module";
import { UserAddress } from "../user-addresses/user-address.entity";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([
      Auth,
      AgoraRtmToken,
      Card,
      Order,
      File,
      Product,
      Show,
      SimpleProduct,
      Sku,
      User,
      UserAddress,
    ]),
    FilesModule,
    StripeModule,
  ],
  providers: [UsersService],
})
export class UsersModule {}
