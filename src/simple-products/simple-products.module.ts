import { Stripe2Module } from 'src/stripe2/stripe2.module';

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
import { Show } from '../shows/entities/show.entity';
import { User } from '../users/entities/user.entity';
import { SimpleProduct } from './entities/simple-product.entity';
import { SimpleProductsController } from './simple-products.controller';
import { SimpleProductsService } from './simple-products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SimpleProduct, User, File, Show]),
    forwardRef(() => Stripe2Module),
  ],
  controllers: [SimpleProductsController],
  providers: [SimpleProductsService],
  exports: [SimpleProductsService],
})
export class SimpleProductsModule {}
