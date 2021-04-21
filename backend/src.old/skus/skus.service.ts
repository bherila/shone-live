import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Product } from "../products/entities/product.entity";
import { Show } from "../shows/entities/show.entity";
import { StripeService } from "../stripe/stripe.service";
import { CreateSkuDto } from "./dto/create-sku.dto";
import { UpdateSkuDto } from "./dto/update-sku.dto";
import { Sku } from "./entities/sku.entity";

@Injectable()
export class SkusService {
  constructor(
    @InjectRepository(Sku)
    private readonly skuRepository: Repository<Sku>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    private readonly stripeService: StripeService
  ) {}

  async create(createSkuDto: CreateSkuDto) {
    const stripeSku = await this.stripeService.createStripeSku(createSkuDto);
    const product = await this.productRepository.findOne({
      where: { id: createSkuDto.product_id },
    });
    const show = await this.showRepository.findOne({
      where: { id: createSkuDto.show_id },
    });
    const sku = this.skuRepository.create({
      ...createSkuDto,
      id: stripeSku.id,
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

  async update(id: string, updateSkuDto: UpdateSkuDto) {
    const product = await this.productRepository.findOne(
      updateSkuDto.product_id
    );
    if (!product) {
      throw new NotFoundException(
        `Product #${updateSkuDto.product_id} not found`
      );
    }
    const show = await this.showRepository.findOne(updateSkuDto.show_id);
    if (!show) {
      throw new NotFoundException(`Show #${updateSkuDto.show_id} not found`);
    }
    const sku = await this.skuRepository.preload({
      id: id,
      ...updateSkuDto,
      product,
      show,
    });
    if (!sku) {
      throw new NotFoundException(`Sku #${id} not found`);
    }
    return this.skuRepository.save(sku);
  }

  async remove(id: string): Promise<Sku> {
    const sku = await this.skuRepository.findOne(id);
    return await this.skuRepository.remove(sku);
  }
}
