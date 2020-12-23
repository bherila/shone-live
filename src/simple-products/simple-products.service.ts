import { Repository, SaveOptions } from 'typeorm';

import {
  forwardRef, Inject, Injectable, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { File } from '../files/entities/file.entity';
import { Show } from '../shows/entities/show.entity';
import { Stripe2Service } from '../stripe2/stripe2.service';
import { User } from '../users/entities/user.entity';
import { CreateSimpleProductDto } from './dto/create-simple-product.dto';
import { SimpleProductsQueryDto } from './dto/simple-products-query.dto';
import { UpdateSimpleProductDto } from './dto/update-simple-product.dto';
import { SimpleProduct } from './entities/simple-product.entity';
import {
  SimpleProductSaleResponse,
} from './responses/simple-product-sale.response';

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
    const { show_id, user_id, image_id } = createSimpleProductDto;
    let simpleProductData = { ...createSimpleProductDto };
    let queries: Promise<any>[] = [];

    // move into services and call the service method for one liner
    const fileQuery = this.fileRepository
      .findOne({
        where: { id: image_id },
      })
      .then(file => {
        if (!file) {
          throw new NotFoundException(`File #${image_id} not found`);
        }
        simpleProductData['files'] = [file];
        return file;
      });
    queries.push(fileQuery);

    const userQuery = this.userRepository.findOne(user_id).then(user => {
      if (!user) {
        throw new NotFoundException(`User #${user_id} not found`);
      }
      simpleProductData['user'] = user;
    });
    queries.push(userQuery);

    if (show_id) {
      const showQuery = this.showRepository
        .findOne({ where: { id: show_id } })
        .then(show => {
          if (!show) {
            throw new NotFoundException(`Show #${show_id} not found`);
          }
          simpleProductData['show'] = show;
        });
      queries.push(showQuery);
    }
    // need to await this so we have the `id` from our DB for stripe
    let file_url: string; // need to get our file_url for stripe
    const simpleProduct = await Promise.all(queries).then(values => {
      file_url = values[0].url; // get file_url for use by StripeProduct
      return this.simpleProductRepository.save(
        this.simpleProductRepository.create(simpleProductData),
      );
    });

    this.stripe2Service
      .createStripeProduct(simpleProduct, [file_url])
      .then(() => {
        this.stripe2Service
          .createStripePrice(simpleProduct)
          .then(stripePriceResponse => {
            simpleProduct.stripe_price_id = stripePriceResponse.id;
            this.simpleProductRepository.save(simpleProduct);
          });
      });

    return simpleProduct;
  }

  async findAll(
    simpleProductsQueryDto: SimpleProductsQueryDto,
    relations: string[] = [],
  ): Promise<SimpleProduct[]> {
    const { user_id, show_id } = simpleProductsQueryDto;
    let query: any = {};
    if (user_id) {
      query['user'] = user_id;
    }
    if (show_id) {
      const _id = await this.showRepository.findOne({ where: { id: show_id } });
      query['show'] = _id;
    }
    return this.simpleProductRepository.find({
      where: query,
      relations: relations,
    });
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

  async update(
    simpleProductId: string,
    updateSimpleProductDto: UpdateSimpleProductDto,
  ): Promise<SimpleProduct> {
    const { show_id } = updateSimpleProductDto;
    let simpleProductUpdate = {};
    if (show_id) {
      simpleProductUpdate['show'] = await this.showRepository.findOne({
        where: { id: show_id },
      });
    }
    return this.updateHelper(simpleProductId, simpleProductUpdate);
  }

  async updateHelper(
    simpleProductId: string,
    updateObject: SaveOptions,
  ): Promise<SimpleProduct> {
    return this.simpleProductRepository
      .findOne({ where: { id: simpleProductId } })
      .then(simpleProduct => {
        if (!simpleProduct) {
          throw new NotFoundException(
            `simpleProduct #${simpleProductId} not found`,
          );
        }
        return this.simpleProductRepository.save({
          ...simpleProduct,
          ...updateObject,
        });
      });
  }

  async bulkUpdate(
    fieldToUpdate: string,
    fieldValue: string,
    simpleProductIds: string[],
  ): Promise<Promise<SimpleProduct>[]> {
    let simpleProductUpdate = {};
    if (fieldToUpdate === 'showId') {
      simpleProductUpdate['show'] = await this.showRepository.findOne({
        where: { id: fieldValue },
      });
    }
    return simpleProductIds.map(simpleProductId => {
      return this.updateHelper(simpleProductId, simpleProductUpdate);
    });
  }

  async updateQuantitySold(
    simpleProductId: string,
    sale_quantity: number,
  ): Promise<SimpleProductSaleResponse> {
    return this.findOne(simpleProductId, ['show']).then(product => {
      product.quantity_sold += sale_quantity;
      return this.simpleProductRepository.save(product).then(savedProduct => {
        return {
          showId: product.show.id,
          simpleProductId: simpleProductId,
          quantityLeft: savedProduct.quantity_sold,
        };
      });
    });
  }

  remove(id: string) {
    return `This action removes a #${id} simpleProduct`;
  }
}
