import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './entities/product.entity'
import { ProductsService } from './products.service'

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => Product, { nullable: true })
  product(@Args('showId') showId: number) {
    return this.productsService.findOne(showId)
  }

  @Query(() => [Product])
  products(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Product[]> {
    return this.productsService.findAll(paginationQuery)
  }
  @Mutation(() => Product)
  async add_products(@Args('data') data: CreateProductDto) {
    return await this.productsService.create(data)
  }
}
