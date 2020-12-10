import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
import { OrderSku } from '../order-skus/entities/order-sku.entity';
import { Product } from '../products/entities/product.entity';
import { Show } from '../shows/entities/show.entity';
import { StripeModule } from '../stripe/stripe.module';
import { User } from '../users/entities/user.entity';
import { Sku } from './entities/sku.entity';
import { SkusController } from './skus.controller';
import { SkusService } from './skus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderSku, File, Sku, Show, Product, User]),
    StripeModule,
  ],
  providers: [SkusService],
  controllers: [SkusController],
})
export class SkusModule {}
