import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { Show } from '../show/entities/show.entity'
import { ShowRepository } from '../show/show.repository'
import { User } from '../user/entities/user.entity'
import { UserRepository } from '../user/user.repository'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './entities/product.entity'
import { ProductRepository } from './products.repository'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(Show)
    private readonly showRepository: ShowRepository,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.productRepository.find({
      relations: ['user', 'show'],
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id, {
      relations: ['user', 'show'],
    })
    if (!product) {
      throw new NotFoundException(`Product id: ${id} not found`)
    }
    return product
  }

  async create(createProductDto: CreateProductDto) {
    const user = await this.userRepository.findOne(createProductDto.userId)
    if (!user) {
      throw new NotFoundException(`User #${createProductDto.userId} not found`)
    }
    const show = await this.showRepository.findOne(createProductDto.showId)
    if (!show) {
      throw new NotFoundException(`Show #${createProductDto.showId} not found`)
    }
    const product = this.productRepository.create({
      show,
      user,
      ...createProductDto,
    })
    const savedProduct = await this.productRepository.save(product)
    return savedProduct
  }

  async remove(id: number) {
    const product = await this.findOne(id)
    return this.productRepository.remove(product)
  }
}
