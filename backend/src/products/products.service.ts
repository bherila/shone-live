import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { Show } from "../shows/entities/show.entity";
import { StripeService } from "../stripe/stripe.service";
import { User } from "../users/entities/user.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    private readonly stripeService: StripeService
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.productRepository.find({
      relations: ["user", "show", "files"],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne(id, {
      relations: ["user", "show", "files"],
    });
    if (!product) {
      throw new NotFoundException(`Product id: ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const user = await this.userRepository.findOne(createProductDto.user_id);
    if (!user) {
      throw new NotFoundException(
        `User #${createProductDto.user_id} not found`
      );
    }
    const show = await this.showRepository.findOne(createProductDto.show_id);
    if (!show) {
      throw new NotFoundException(
        `Show #${createProductDto.show_id} not found`
      );
    }
    const stripeProduct = await this.stripeService.createStripeProduct(
      createProductDto,
      show.id,
      show.scheduled_start.toString()
    );
    const product = this.productRepository.create({
      id: stripeProduct.id,
      show: show,
      user: user,
      // current_quantity: createProductDto.quantity,
      ...createProductDto,
    });
    const savedProduct = await this.productRepository.save(product);
    // this.stripeService.createStripePrice(savedProduct);
    // refactor to take the product and then the SKU specific info
    // this.stripeService.createStripeSku(savedProduct); // todo: this is an eg of async, but many of these functions tagged async are actually awaiting everything so are blocking and should be cleaned up
    return savedProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const user = await this.userRepository.findOne(updateProductDto.user_id);
    if (!user) {
      throw new NotFoundException(
        `User #${updateProductDto.user_id} not found`
      );
    }
    const show = await this.showRepository.findOne(updateProductDto.show_id);
    if (!show) {
      throw new NotFoundException(
        `Show #${updateProductDto.show_id} not found`
      );
    }
    const product = await this.productRepository.preload({
      id: id,
      user: user,
      show: show,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product id: ${id} not found`);
    }
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.productRepository.remove(product);
  }
}
