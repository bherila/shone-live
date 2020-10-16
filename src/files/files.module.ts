import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Show } from 'src/shows/entities/show.entity';
import { Sku } from 'src/skus/entities/sku.entity';
import { User } from 'src/users/entities/user.entity';

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from './entities/file.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './files', // todo figure out how to save to S3 (perhaps use minio https://dev.to/efd1006/fileupload-with-nestjs-using-minio-2f44)
    }),
    TypeOrmModule.forFeature([File, User, Product, Show, Sku, Order]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
