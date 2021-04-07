import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Show } from '../show/entities/show.entity'
import { ShowRepository } from '../show/show.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { Product } from './entities/product.entity'
import { ProductRepository } from './products.repository'
import { ProductResolver } from './products.resolver'
import { ProductsService } from './products.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      User,
      Show,
      ProductRepository,
      ShowRepository,
      UserRepository,
    ]),
  ],
  providers: [ProductsService, ProductResolver],
})
export class ProductsModule {}
