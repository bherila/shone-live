import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
import { Show } from '../shows/entities/show.entity';
import { Sku } from '../skus/entities/sku.entity';
import { StripeModule } from '../stripe/stripe.module';
import { User } from '../users/entities/user.entity';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User, File, Show, Sku]),
    StripeModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
