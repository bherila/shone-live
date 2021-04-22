import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { BrandsService } from './brands.service'
import { CreateBrandDto } from './dto/create-brand.dto'
import { UpdateBrandDto } from './dto/update-brand.dto'
import { Brand } from './entities/brand.entity'

@Resolver(() => Brand)
export class BrandResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Query(() => Brand, { nullable: true })
  brand(@Args('brandId') brandId: string) {
    return this.brandsService.findOne(brandId)
  }

  @Query(() => [Brand])
  brands(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Brand[]> {
    return this.brandsService.findAll(paginationQuery)
  }

  @Query(() => [Brand])
  @UseGuards(new AuthGuard())
  my_brands(
    @Context('user') user,
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Brand[]> {
    return this.brandsService.findByUser(paginationQuery, user.id)
  }

  @Mutation(() => Brand)
  @UseGuards(new AuthGuard())
  async add_brand(@Context('user') user, @Args('data') data: CreateBrandDto) {
    return await this.brandsService.create(data, user.id)
  }

  @Mutation(() => Brand)
  @UseGuards(new AuthGuard())
  async update_brand(@Args('data') data: UpdateBrandDto) {
    return await this.brandsService.update(data)
  }
}
