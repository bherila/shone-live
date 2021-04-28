import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CreateVariantDto } from './dto/create-variant.dto'
import { UpdateVariantDto } from './dto/update-variant.dto'
import { Variant } from './entities/variant.entity'
import { VariantsService } from './variants.service'

@Resolver(() => Variant)
export class VariantResolver {
  constructor(private readonly variantsService: VariantsService) {}

  @Query(() => Variant, { nullable: true })
  variant(@Args('variantId') variantId: string) {
    return this.variantsService.findOne(variantId)
  }

  @Query(() => [Variant])
  variants(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Variant[]> {
    return this.variantsService.findAll(paginationQuery)
  }

  @Query(() => [Variant])
  @UseGuards(new AuthGuard())
  brandVariants(
    @Args('productId') productId: string,
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<Variant[]> {
    return this.variantsService.findByProduct(paginationQuery, productId)
  }

  @Mutation(() => Variant)
  @UseGuards(new AuthGuard())
  async addVariant(@Args('data') data: CreateVariantDto) {
    return await this.variantsService.create(data)
  }

  @Mutation(() => Variant)
  @UseGuards(new AuthGuard())
  async update_variant(@Args('data') data: UpdateVariantDto) {
    return await this.variantsService.update(data)
  }
}
