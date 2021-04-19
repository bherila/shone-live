import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import { ProductsService } from './products.service'

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => Product, { nullable: true })
  product(@Args('productId') productId: string) {
    return this.productsService.findOne(productId)
  }

  @Query(() => [Product])
  products(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Product[]> {
    return this.productsService.findAll(paginationQuery)
  }

  @Query(() => [Product])
  @UseGuards(new AuthGuard())
  my_products(
    @Context('user') user,
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Product[]> {
    return this.productsService.findByUser(paginationQuery, user.id)
  }

  @Mutation(() => Product)
  @UseGuards(new AuthGuard())
  async add_product(
    @Context('user') user,
    @Args('data') data: CreateProductDto,
  ) {
    return await this.productsService.create(data, user.id)
  }

  @Mutation(() => Product)
  @UseGuards(new AuthGuard())
  async update_product(@Args('data') data: UpdateProductDto) {
    return await this.productsService.update(data)
  }
}
