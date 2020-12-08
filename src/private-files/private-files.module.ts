import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '../common/common.module';
import { Product } from '../products/entities/product.entity';
import { Sku } from '../skus/entities/sku.entity';
import { User } from '../users/entities/user.entity';
import { PrivateFile } from './entities/private-file.entity';
import { PrivateFilesController } from './private-files.controller';
import { PrivateFilesService } from './private-files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, Sku, PrivateFile]),
    ConfigModule,
    CommonModule,
  ],
  providers: [PrivateFilesService],
  exports: [PrivateFilesService],
  controllers: [PrivateFilesController],
})
export class PrivateFilesModule {}
