import { Module } from '@nestjs/common';
import { SkusService } from './skus.service';
import { SkusController } from './skus.controller';
import { Sku } from './entities/sku.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeService } from 'src/stripe/stripe.service';
import { OrderSku } from 'src/order-skus/entities/order-sku.entity';
import { Show } from 'src/shows/entities/show.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderSku, Sku, Show, Product])],
  providers: [SkusService, StripeService],
  controllers: [SkusController]
})
export class SkusModule {}
