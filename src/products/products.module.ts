import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Show } from 'src/shows/entities/show.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { Sku } from 'src/skus/entities/sku.entity';
import { File } from "../files/entities/file.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product, User, Show, Sku, File])],
    controllers: [ProductsController],
    providers: [ProductsService, StripeService]
})
export class ProductsModule {}
