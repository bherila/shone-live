import { Stripe2Service } from 'src/stripe2/stripe2.service';
import { Repository } from 'typeorm';

import {
  forwardRef, Inject, Injectable, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
import { Show } from '../shows/entities/show.entity';
import { User } from '../users/entities/user.entity';
import { CreateSimpleProductDto } from './dto/create-simple-product.dto';
import { UpdateSimpleProductDto } from './dto/update-simple-product.dto';
import { SimpleProduct } from './entities/simple-product.entity';

@Injectable()
export class SimpleProductsService {
  constructor(
    @InjectRepository(SimpleProduct)
    private readonly simpleProductRepository: Repository<SimpleProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @Inject(forwardRef(() => Stripe2Service))
    private readonly stripe2Service: Stripe2Service,
  ) {}

  async create(
    createSimpleProductDto: CreateSimpleProductDto,
  ): Promise<SimpleProduct> {
    // move into services and call the service method for one liner
    const user = await this.userRepository.findOne(
      createSimpleProductDto.user_id,
    );
    if (!user) {
      throw new NotFoundException(
        `User #${createSimpleProductDto.user_id} not found`,
      );
    }
    const show = await this.showRepository.findOne({
      where: { id: createSimpleProductDto.show_id },
    });
    if (!show) {
      throw new NotFoundException(
        `Show #${createSimpleProductDto.show_id} not found`,
      );
    }
    const file = await this.fileRepository.findOne({
      where: { id: createSimpleProductDto.image_id },
    });
    if (!file) {
      throw new NotFoundException(
        `Image #${createSimpleProductDto.image_id} not found`,
      );
    }
    const simpleProduct = this.simpleProductRepository.create({
      user: user,
      show: show,
      files: [file],
      ...createSimpleProductDto,
    });
    // need to await this so we have the `id` from our DB for stripe
    const savedSimpleProduct = await this.simpleProductRepository.save(
      simpleProduct,
    );

    this.stripe2Service
      .createStripeProduct(simpleProduct, [file.url])
      .then(() => {
        this.stripe2Service
          .createStripePrice(simpleProduct)
          .then(stripePriceResponse => {
            simpleProduct.stripe_price_id = stripePriceResponse.id;
            this.simpleProductRepository.save(simpleProduct);
          });
      });

    return savedSimpleProduct;
  }

  findAll() {
    return `This action returns all simpleProducts`;
  }

  async findOne(id: string, relations: string[] = []): Promise<SimpleProduct> {
    return this.simpleProductRepository
      .findOne({
        where: { id: id },
        relations: relations,
      })
      .then(simpleProduct => {
        if (!simpleProduct) {
          new NotFoundException(`SimpleProduct #${id} not found`);
        }
        return simpleProduct;
      });
  }

  update(id: string, updateSimpleProductDto: UpdateSimpleProductDto) {
    return `This action updates a #${id} simpleProduct`;
  }

  updateQuantitySold(id: string, sale_quantity: number) {
    this.findOne(id).then(product => {
      product.quantity_sold += sale_quantity;
      this.simpleProductRepository.save(product);
    });
  }

  remove(id: string) {
    return `This action removes a #${id} simpleProduct`;
  }
}
