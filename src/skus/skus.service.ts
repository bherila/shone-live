import { Product } from 'src/products/entities/product.entity';
import { Show } from 'src/shows/entities/show.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSkuDto } from './dto/create-sku.dto';
import { Sku } from './entities/sku.entity';

@Injectable()
export class SkusService {
  constructor(
    @InjectRepository(Sku)
    private readonly skuRepository: Repository<Sku>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    private readonly stripeService: StripeService,
  ) {}

  async create(createSkuDto: CreateSkuDto) {
    const stripeSku = await this.stripeService.createStripeSku(createSkuDto);
    const product = await this.productRepository.findOne({
      where: { id: createSkuDto.product },
    });
    const show = await this.showRepository.findOne({
      where: { id: createSkuDto.show },
    });
    const sku = this.skuRepository.create({
      id: stripeSku.id,
      price: createSkuDto.price,
      active_at: createSkuDto.active_at,
      inactive_at: createSkuDto.inactive_at,
      quantity: createSkuDto.quantity,
      current_quantity: createSkuDto.quantity,
      product: product,
      show: show,
    });
    if (createSkuDto.attributes) {
      sku.attributes = JSON.parse(createSkuDto.attributes);
    }
    const savedSku = await this.skuRepository.save(sku);
    return savedSku;
  }
}
