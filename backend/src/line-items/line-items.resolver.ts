import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from '../common/auth.guards'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CreateLineItemsDto } from './dto/create-line-item.dto'
import { UpdateLineItemsDto } from './dto/update-line-item.dto'
import { LineItem } from './entities/line-item.entity'
import { LineItemsService } from './line-items.service'

@Resolver(() => LineItem)
export class LineItemsResolver {
  constructor(private readonly lineitemsService: LineItemsService) {}

  @Query(() => LineItem, { nullable: true })
  lineItem(@Args('lineitemsId') lineitemsId: string) {
    return this.lineitemsService.findOne(lineitemsId)
  }

  @Query(() => [LineItem])
  lineItems(
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<LineItem[]> {
    return this.lineitemsService.findAll(paginationQuery)
  }

  @Query(() => [LineItem])
  @UseGuards(new AuthGuard())
  orderLineItems(
    @Args('orderId') orderId: string,
    @Args('paginationQuery') paginationQuery: PaginationQueryDto,
  ): Promise<LineItem[]> {
    return this.lineitemsService.findByOrder(paginationQuery, orderId)
  }

  @Mutation(() => LineItem)
  @UseGuards(new AuthGuard())
  async addLineItems(@Args('data') data: CreateLineItemsDto) {
    return await this.lineitemsService.create(data)
  }

  @Mutation(() => LineItem)
  @UseGuards(new AuthGuard())
  async updateLineItems(@Args('data') data: UpdateLineItemsDto) {
    return await this.lineitemsService.update(data)
  }
}
