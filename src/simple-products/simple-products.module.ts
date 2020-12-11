import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
import { Show } from '../shows/entities/show.entity';
import { User } from '../users/entities/user.entity';
import { SimpleProduct } from './entities/simple-product.entity';
import { SimpleProductsController } from './simple-products.controller';
import { SimpleProductsService } from './simple-products.service';

@Module({
  imports: [TypeOrmModule.forFeature([SimpleProduct, User, File, Show])],
  controllers: [SimpleProductsController],
  providers: [SimpleProductsService],
})
export class SimpleProductsModule {}
