import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { Order } from '../orders/entities/order.entity'
import { OrderRepository } from '../orders/orders.repository'
import { Sku } from '../skus/entities/sku.entity'
import { SkuRepository } from '../skus/skus.repository'
import { CreateLineItemsDto } from './dto/create-line-item.dto'
import { UpdateLineItemsDto } from './dto/update-line-item.dto'
import { LineItem } from './entities/line-item.entity'
import { LineItemsRepository } from './line-items.repository'

@Injectable()
export class LineItemsService {
  constructor(
    @InjectRepository(LineItem)
    private readonly lineitemsRepository: LineItemsRepository,
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(Sku)
    private readonly skuRepository: SkuRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.lineitemsRepository.find({
      relations: ['order', 'sku'],
      skip: offset,
      take: limit,
    })
  }

  async findByOrder(paginationQuery: PaginationQueryDto, orderId: string) {
    const { limit, offset } = paginationQuery
    return this.lineitemsRepository.find({
      where: { order: { id: orderId } },
      relations: ['sku'],
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: string) {
    return await this.lineitemsRepository.findOrFail(id)
  }

  async create({ orderId, skuId, ...createLineItemsDto }: CreateLineItemsDto) {
    const order = await this.orderRepository.findOrFail(orderId)
    const sku = await this.skuRepository.findOrFail(skuId)
    const lineitems = this.lineitemsRepository.create({
      order,
      sku,
      ...createLineItemsDto,
    })
    const savedLineItems = await this.lineitemsRepository.save(lineitems)
    return savedLineItems
  }

  async update({ id, ...updateLineItemsDto }: UpdateLineItemsDto) {
    await this.lineitemsRepository.update(id, updateLineItemsDto)
    return await this.findOne(id)
  }

  async remove(id: string) {
    const lineitems = await this.findOne(id)
    return this.lineitemsRepository.remove(lineitems)
  }
}
