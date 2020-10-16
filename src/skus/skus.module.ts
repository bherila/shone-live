import { OrderSku } from 'src/order-skus/entities/order-sku.entity';
import { Product } from 'src/products/entities/product.entity';
import { Show } from 'src/shows/entities/show.entity';
import { StripeModule } from 'src/stripe/stripe.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sku } from './entities/sku.entity';
import { SkusController } from './skus.controller';
import { SkusService } from './skus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderSku, Sku, Show, Product]),
    StripeModule,
  ],
  providers: [SkusService],
  controllers: [SkusController],
})
export class SkusModule {}
