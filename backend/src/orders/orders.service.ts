import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { ShowSegment } from '../show-segment/entities/show-segment.entity'
import { ShowSegmentRepository } from '../show-segment/show-segments.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { CreateorderDto } from './dto/create-order.dto'
import { UpdateorderDto } from './dto/update-order.dto'
import { Order } from './entities/order.entity'
import { OrderRepository } from './orders.repository'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(ShowSegment)
    private readonly showSegmentRepository: ShowSegmentRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.orderRepository.find({
      relations: ['user', 'lineItems', 'lineItems.sku'],
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: string) {
    return await this.orderRepository.findOrFail(id, {
      relations: ['user', 'lineItems', 'lineItems.sku'],
    })
  }

  findByUser(paginationQuery: PaginationQueryDto, userId: string) {
    const { limit, offset } = paginationQuery
    return this.orderRepository.find({
      relations: ['user', 'lineItems', 'lineItems.sku'],
      skip: offset,
      take: limit,
      where: { user: { id: userId } },
    })
  }

  findByBrand(paginationQuery: PaginationQueryDto, brandId: string) {
    const { limit, offset } = paginationQuery
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.lineItems', 'lineItems')
      .where('lineItems.brand_id = :brandId', {
        brandId,
      })
      .skip(offset)
      .take(limit)
      .getMany()
  }

  async create(createorderDto: CreateorderDto, userId: string) {
    const user = await this.userRepository.findOrFail(userId)
    const order = this.orderRepository.create({
      user,
      ...createorderDto,
    })
    const savedOrder = await this.orderRepository.save(order)
    return savedOrder
  }

  async update({ id, description, name }: UpdateorderDto) {
    await this.orderRepository.update(id, {
      description,
      name,
    })
    return await this.findOne(id)
  }

  async remove(id: string) {
    const order = await this.findOne(id)
    return this.orderRepository.remove(order)
  }
}
