import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CreateSkuDto } from './dto/create-sku.dto'
import { UpdateSkuDto } from './dto/update-sku.dto'
import { Sku } from './entities/sku.entity'
import { SkusService } from './skus.service'

@Resolver(() => Sku)
export class SkuResolver {
  constructor(private readonly skusService: SkusService) {}

  @Query(() => Sku, { nullable: true })
  sku(@Args('skuId') skuId: string) {
    return this.skusService.findOne(skuId)
  }

  @Query(() => [Sku])
  skus(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Sku[]> {
    return this.skusService.findAll(paginationQuery)
  }

  @Query(() => [Sku])
  @UseGuards(new AuthGuard())
  variantSkus(
    @Args('variantId') variantId: string,
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Sku[]> {
    return this.skusService.findByVariant(paginationQuery, variantId)
  }

  @Mutation(() => Sku)
  @UseGuards(new AuthGuard())
  async addSku(@Args('data') data: CreateSkuDto) {
    return await this.skusService.create(data)
  }

  @Mutation(() => Sku)
  @UseGuards(new AuthGuard())
  async updateSku(@Args('data') data: UpdateSkuDto) {
    return await this.skusService.update(data)
  }
}
