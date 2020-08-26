import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Show } from 'src/shows/entities/show.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, User, Show])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
