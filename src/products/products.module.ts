import { Show } from 'src/shows/entities/show.entity';
import { Sku } from 'src/skus/entities/sku.entity';
import { StripeModule } from 'src/stripe/stripe.module';
import { User } from 'src/users/entities/user.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User, Show, Sku, File]),
    StripeModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
