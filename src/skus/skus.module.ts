import { Module } from '@nestjs/common';
import { SkusService } from './skus.service';
import { SkusController } from './skus.controller';
import { Sku } from './entities/sku.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSku } from 'src/order-skus/entities/order-sku.entity';
import { Show } from 'src/shows/entities/show.entity';
import { Product } from 'src/products/entities/product.entity';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderSku,
      Sku,
      Show,
      Product
    ]),
    StripeModule,
  ],
  providers: [SkusService],
  controllers: [SkusController]
})
export class SkusModule {}
