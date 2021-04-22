import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CommonModule } from "../common/common.module";
import { Product } from "../products/entities/product.entity";
import { SimpleProduct } from "../simple-products/entities/simple-product.entity";
import { Sku } from "../skus/entities/sku.entity";
import { User } from "../users/entities/user.entity";
import { File } from "./entities/file.entity";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, SimpleProduct, Sku, File]),
    ConfigModule,
    CommonModule,
  ],
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
