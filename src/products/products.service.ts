import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/users/entities/user.entity';
import { Show } from 'src/shows/entities/show.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Show)
        private readonly showRepository: Repository<Show>,
    ) { }

    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        return this.productRepository.find({
            relations: ['user', 'show', 'files'],
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: string) {
        const product = await this.productRepository.findOne(id, {
            relations: ['user', 'show', 'files'],
        });
        if (!product) {
            throw new NotFoundException(`Product id: ${id} not found`)
        }
        return product;
    }

    async create(createProductDto: CreateProductDto) {
        const product = this.productRepository.create(createProductDto);
        product.user = await this.userRepository.findOne(createProductDto.userId);
        product.show = await this.showRepository.findOne(createProductDto.showId);
        return this.productRepository.save(product);
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.productRepository.preload({
            id: +id,
            userId: updateProductDto.userId, // todo see if can remove, should be included in DTO already
            showId: updateProductDto.showId, // todo see if can remove, should be included in DTO already
            ...updateProductDto,
        });
        if (!product) {
            throw new NotFoundException(`Product id: ${id} not found`)
        }
        return this.productRepository.save(product);
    }

    async remove(id: string) {
        const product = await this.findOne(id);
        return this.productRepository.remove(product);
    }
}
