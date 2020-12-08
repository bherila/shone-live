import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderSku } from '../order-skus/entities/order-sku.entity';
import { PrivateFile } from '../private-files/entities/private-file.entity';
import { Product } from '../products/entities/product.entity';
import { Show } from '../shows/entities/show.entity';
import { StripeModule } from '../stripe/stripe.module';
import { Sku } from './entities/sku.entity';
import { SkusController } from './skus.controller';
import { SkusService } from './skus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderSku, PrivateFile, Sku, Show, Product]),
    StripeModule,
  ],
  providers: [SkusService],
  controllers: [SkusController],
})
export class SkusModule {}
